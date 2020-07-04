"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const ArticlesInstanceAbl = require("./articles-instance-abl");
const Errors = require("../api/errors/newspaper-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  }
};

const DEFAULTS = {
  pageIndex: 0,
  pageSize: 50
};


class NewspaperAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "newspaper-types.js"));
    this.dao = DaoFactory.getDao("newspaper");
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
    
    let newspaper = await this.dao.get(awid, dtoIn.id);
    if (!newspaper) {      
        throw new Errors.Get.NewspaperDaoGetFailed(uuAppErrorMap, { id: dtoIn.id });
      }

    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper;    
  }

  async update(awid, dtoIn) {
    await ArticlesInstanceAbl.checkInstance(
      awid,
      Errors.Update.ArticlesInstanceDoesNotExist,
      Errors.Update.ArticlesInstanceNotInProperState
    ); 

    let validationResult = this.validator.validate("updateDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    
    dtoIn.awid = awid;

    let newspaper; 
    try {
      newspaper = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {      
        throw new Errors.Update.NewspaperDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper; 

  }

  async list(awid, dtoIn) {
    // hds 1
    await ArticlesInstanceAbl.checkInstance(
      awid,
      Errors.List.ArticlesInstanceDoesNotExist,
      Errors.List.ArticlesInstanceNotInProperState
    ); 
    //hds 2
    let validationResult = this.validator.validate("listDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    //hds 3
   let list = await this.dao.list(awid, dtoIn.pageInfo);

    // hds 4
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
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

    let newspaper;
    try {
      newspaper = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {      
        throw new Errors.Create.NewspaperDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    newspaper.uuAppErrorMap = uuAppErrorMap;
    return newspaper;

  }


}

module.exports = new NewspaperAbl();
