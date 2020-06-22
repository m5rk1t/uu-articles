"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const AUTHOR_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}author/`;

const Create = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}create/`,
  ArticlesInstanceDoesNotExist: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}articlesInstanceDoesNotExist`;
      this.message = "ArticlesInstance does not exist.";
    }
  },
  ArticlesInstanceNotInProperState: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}articlesInstanceNotInProperState`;
      this.message = "ArticlesInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AuthorDaoCreateFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}authorDaoCreateFailed`;
      this.message = "Create author by author DAO create failed.";
    }
  }
  
  
};

module.exports = {
  Create
};
