"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory,  ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const ArticlesInstanceAbl = require("./articles-instance-abl");
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/article-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  createTopicDoesNotExist: {
    code: `${Errors.Create.UC_CODE}topicDoesNotExist`,
    message: "Some topics in dtoIn.topicIdList do not exist."
  }
};
const DEFAULTS = {
  pageIndex: 0,
  pageSize: 50
};

class ArticleAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "article-types.js"));
    this.dao = DaoFactory.getDao("article");
    this.topicDao = DaoFactory.getDao("topic");
    this.newspaperDao = DaoFactory.getDao("newspaper");
    this.authorDao = DaoFactory.getDao("author");    
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
    let areFiltersMissing = (!dtoIn.topicId && !dtoIn.publicationDate);
    let isPublicationDateSet = (dtoIn.publicationDate);

    let list;
    if (areFiltersMissing){
      list = await this.dao.list(awid, dtoIn.pageInfo);
    } else if (isPublicationDateSet){
      list = await this.dao.listByPublicDateAndTopicId(awid, dtoIn.publicationDate, dtoIn.topicId, dtoIn.pageInfo);
    } else {
      list = await this.dao.listByTopicId(awid, dtoIn.topicId, dtoIn.pageInfo);
    }

    // hds 4
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }

  async create(awid, dtoIn, session) {
    //hds 1
    await ArticlesInstanceAbl.checkInstance(
      awid,
      Errors.Create.ArticlesInstanceDoesNotExist,
      Errors.Create.ArticlesInstanceNotInProperState
    ); 
    //hds 2
    let validationResult = this.validator.validate("createDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    dtoIn.visibility = false;
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();    
    dtoIn.awid = awid;
    //hds 3.1
    let topicList = await this.topicDao.listByTopicIdList(awid, dtoIn.topicIdList, {});    
    
    if (topicList.itemList.length === 0) {
      throw new Errors.Create.TopicsDoNotExist({ uuAppErrorMap }, { topicIdList: dtoIn.topicIdList});
    } 
    let topicIdList = topicList.itemList.map(topic => topic.id.toString())
    // select non-existing ids
    let nonExTopicIds = dtoIn.topicIdList.filter(id => !topicIdList.includes(id));
    // hds 3.1.1.2
    if (nonExTopicIds.length !== 0) {
      ValidationHelper.addWarning(
        uuAppErrorMap,
        WARNINGS.createTopicDoesNotExist.code,
        WARNINGS.createTopicDoesNotExist.message,
        { nonExTopicIds: [...new Set(nonExTopicIds)] }
      );
    }

    dtoIn.topicIdList = [...new Set(topicIdList)];
    
    // hds 3.2
    let author = await this.authorDao.get(awid, dtoIn.authorId);
    // A5
    if (!author) {
      throw new Errors.Delete.AuthorDoesNotExist({ uuAppErrorMap }, { authorId: dtoIn.authorId });
    }
    // hds 3.3
    let newspaper = await this.newspaperDao.get(awid, dtoIn.newspaperId);
    // A5
    if (!newspaper) {
      throw new Errors.Delete.NewspaperDoesNotExist({ uuAppErrorMap }, { newspaperId: dtoIn.newspaperId });
    }
    // hds 3.4
    let article;
    try {
      article = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {      
        throw new Errors.Create.ArticleDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    //hds 4
    article.uuAppErrorMap = uuAppErrorMap;
    return article;
    
  }

}

module.exports = new ArticleAbl();
