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
  }
};

class AuthorAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "author-types.js"));
    this.dao = DaoFactory.getDao("author");
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
