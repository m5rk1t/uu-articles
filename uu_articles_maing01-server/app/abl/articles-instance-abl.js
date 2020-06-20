"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { SysProfileModel } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/articles-instance-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`
  }
};

const DEFAULTS = {
  name: "uuArticles",
  description: "News application allows you to record and search for articles from different newspapers.",
  state: "underConstruction"
  };

class ArticlesInstanceAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "articles-instance-types.js"));
    this.dao = DaoFactory.getDao("articlesInstance");
  }

  async load(awid, authorizationResult) {

     let articlesInstance = await this.checkInstance(
      awid,
      Errors.Load.ArticlesInstanceDoesNotExist,
      Errors.Load.ArticlesInstanceNotInProperState
    );
    
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      articlesInstance.state === "underConstruction" &&
      !authorizedProfiles.includes("Authorities") &&
      !authorizedProfiles.includes("Executives")
    ) {
      throw new Errors.Load.ArticlesInstanceIsUnderConstruction({}, { state: articlesInstance.state });
    }

    articlesInstance.authorizedProfileList = authorizedProfiles;

    return articlesInstance;   
  }

  async init(awid, dtoIn) {
    // Checks if the articlesInstance uuObject already exists
    let articlesInstance = await this.dao.getByAwid(awid);
     
    if (articlesInstance) {
      throw new Errors.Init.ArticlesInstanceAlreadyInitialized({});
    }
    
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    
    const schemas = ["articlesInstance","newspaper", "author", "topic", "article"];
    let schemaCreateResults = schemas.map(async schema => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    
    try {
      await SysProfileModel.setProfile(awid, { code: "Authorities", roleUri: dtoIn.authoritiesUri });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        
        throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.authoritiesUri }, e);
      }
      throw e;
    }
    
    //dtoIn.description = dtoIn.description || DEFAULTS.description;
    dtoIn.state = dtoIn.state || DEFAULTS.state;
    dtoIn.name = dtoIn.name || DEFAULTS.name;
    dtoIn.awid = awid;

    try {
      articlesInstance = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Init.ArticlesInstanceDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    
    articlesInstance.uuAppErrorMap = uuAppErrorMap;
    return articlesInstance;
    };


    async checkInstance(awid, notExistError, closedStateError) {
      let articlesInstance = await this.dao.getByAwid(awid);
      if (!articlesInstance) {
        throw new notExistError({});
      }
      if (articlesInstance.state === "closed") {
        throw new closedStateError(
          {},
          {
            state: articlesInstance.state,
            expectedStateList: ["active", "underConstruction"]
          }
        );
      }
      return articlesInstance;
    }
  }

module.exports = new ArticlesInstanceAbl();
