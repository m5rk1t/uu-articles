"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const ArticlesInstanceAbl = require("./articles-instance-abl");
const Errors = require("../api/errors/author-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};

const DEFAULTS = {
  pageIndex: 0,
  pageSize: 50
};


class AuthorAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "author-types.js"));
    this.dao = DaoFactory.getDao("author");
  }

  async get(awid, dtoIn) {
    
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

    let author;
    try {
      author = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {      
        throw new Errors.Create.AuthorDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    author.uuAppErrorMap = uuAppErrorMap;
    return author;    
  }

}

module.exports = new AuthorAbl();
