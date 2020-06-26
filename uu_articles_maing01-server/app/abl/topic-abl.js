"use strict";
const Path = require("path");
const { Base64 } = require("uu_appg01_server").Utils;
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError, DuplicateKey} = require("uu_appg01_server").ObjectStore;
const UuBinaryAbl = require("uu_appg01_binarystore-cmd").UuBinaryModel;
const ArticlesInstanceAbl = require("./articles-instance-abl");
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");
const FileHelper = require("../helpers/file-helper");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  }  
};

class TopicAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "topic-types.js"));
    this.dao = DaoFactory.getDao("topic");
    this.articleDao = DaoFactory.getDao("article");
  }

  async get(awid, dtoIn) {
     // hds 1
     await ArticlesInstanceAbl.checkInstance(
      awid,
      Errors.Get.ArticlesInstanceDoesNotExist,
      Errors.Get.ArticlesInstanceNotInProperState
    ); 
    // TODO underConstruction

    // hds 2
    let validationResult = this.validator.validate("getDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    
    let topic = await this.dao.get(awid, dtoIn.id);
    if (!topic) {
      throw new Errors.Get.TopicDoesNotExist(uuAppErrorMap, { topicId: dtoIn.id });
    }

    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
    
  }

  async delete(awid, dtoIn) {
    // hds 1
    await ArticlesInstanceAbl.checkInstance(
      awid,
      Errors.Delete.ArticlesInstanceDoesNotExist,
      Errors.Delete.ArticlesInstanceNotInProperState
    ); 
    // hds 2
    let validationResult = this.validator.validate("deleteDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // hds 3
    //hds 3.1

    let topic = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!topic) {
      throw new Errors.Delete.TopicDoesNotExist({ uuAppErrorMap }, { topicId: dtoIn.id });
    }

    // hds 3.2
    let relatedArticles = await this.articleDao.listByTopicId(awid, dtoIn.id);
    if (relatedArticles.itemList.length !== 0) {
      throw new Errors.Delete.RelatedArticlesExist({ uuAppErrorMap }, { relatedArticles: relatedArticles});
    }    

    // hds 3.3
    if (topic.icon) {
      try {
        await UuBinaryAbl.deleteBinary(awid, { code: topic.icon });
      } catch (e) {
        // A7
        throw new Errors.Delete.UuBinaryDeleteFailed({ uuAppErrorMap }, e);
      }
    }

    // hds 3.4
    await this.dao.delete(awid, dtoIn.id);

    // hds 4
    return { uuAppErrorMap };
    
  }

  async create(awid, dtoIn) {
    await ArticlesInstanceAbl.checkInstance(
      awid,
      Errors.Create.ArticlesInstanceDoesNotExist,
      Errors.Create.ArticlesInstanceNotInProperState
    ); 
    let validationResult = this.validator.validate("createDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    
    dtoIn.awid = awid;

    if (dtoIn.icon) {
      //check if stream or base64
      if (dtoIn.icon.readable) {
        //check if the stream is valid
        let { valid: isValidStream, stream } = await FileHelper.validateImageStream(dtoIn.icon);
        if (!isValidStream) {
          throw new Errors.Create.InvalidPhotoContentType({ uuAppErrorMap });
        }
        dtoIn.icon = stream;
      } else {
        //check if the base64 is valid
        let binaryBuffer = Base64.urlSafeDecode(dtoIn.icon, "binary");
        if (!FileHelper.validateImageBuffer(binaryBuffer).valid) {
          throw new Errors.Create.InvalidPhotoContentType({ uuAppErrorMap });
        }

        dtoIn.icon = FileHelper.toStream(binaryBuffer);
      }

      
      try {
        let binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.icon });
        dtoIn.icon = binary.code;
      } catch (e) {
        
        throw new Errors.Create.UuBinaryCreateFailed({ uuAppErrorMap }, e);
      }
    }
    let topic;
    try {
      topic = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof DuplicateKey) {
        // A5
        throw new Errors.Create.TopicNameNotUnique({ uuAppErrorMap }, { topicName: dtoIn.name });
      }
      if (e instanceof ObjectStoreError) {      
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    topic.uuAppErrorMap = uuAppErrorMap;
    return topic;
  }

}

module.exports = new TopicAbl();
