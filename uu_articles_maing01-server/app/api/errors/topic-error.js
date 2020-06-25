"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const TOPIC_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
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
  InvalidPhotoContentType: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidPhotoContentType`;
      this.message = "ContentType of new photo is invalid.";
    }
  },
  UuBinaryCreateFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  TopicNameNotUnique: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicNameNotUnique`;
      this.message = "Topic name is not unique in awid.";
    }
  },
  TopicDaoCreateFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoCreateFailed`;
      this.message = "Create topic by topic DAO create failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}delete/`,
  
};

module.exports = {
  Delete,
  Create
};
