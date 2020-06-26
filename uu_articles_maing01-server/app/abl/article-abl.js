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
  }
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
    let topicIdList = await this.topicDao.listByTopicIdList(awid, dtoIn.topicIdList, {});

    // TODO: removing

    //after remove non-existing topics
    if (topicIdList.itemList.length === 0) {
      throw new Errors.Create.TopicsDoNotExist({ uuAppErrorMap }, { topicIdList: dtoIn.topicIdList});
    } 

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
