"use strict";
const UuArticlesError = require("./uu-articles-error.js");

const Init = {
  UC_CODE: `${UuArticlesError.ERROR_PREFIX}init/`,
  ArticlesInstanceAlreadyInitialized: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}articlesInstanceAlreadyInitialized`;
      this.message = "ArticlesInstance is already initialized.";
    }
  },
  InvalidDtoIn: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },
  ArticlesInstanceDaoCreateFailed:  class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}articlesInstanceDaoCreateFailed`;
      this.message = "Create articlesInstance by articlesInstance DAO create failed.";
    }
  }
};

const Load = {
  UC_CODE: `${UuArticlesError.ERROR_PREFIX}load/`,
  ArticlesInstanceDoesNotExist: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}articlesInstanceDoesNotExist`;
      this.message = "ArticlesInstance does not exist.";
    }
  },
  ArticlesInstanceNotInProperState: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}articlesInstanceNotInProperState`;
      this.message = "ArticlesInstance is not in proper state [active|underConstruction].";
    }
  },
  ArticlesInstanceIsUnderConstruction: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}articlesInstanceIsUnderConstruction`;
      this.message = "ArticlesInstance is in state underConstruction.";
    }
  }  
};

module.exports = {
  Load,
  Init
};
