"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const NEWSPAPER_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}newspaper/`;


const Create = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}create/`,
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
  NewspaperDaoCreateFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}newspaperDaoCreateFailed`;
      this.message = "Create newspaper by newspaper DAO create failed.";
    }
  }
  
};

const Update = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}update/`,
  ArticlesInstanceDoesNotExist: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}articlesInstanceDoesNotExist`;
      this.message = "ArticlesInstance does not exist.";
    }
  },
  ArticlesInstanceNotInProperState: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}articlesInstanceNotInProperState`;
      this.message = "ArticlesInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  NewspaperDaoUpdateFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}newspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper DAO update failed.";
    }
  }  
};

const Get = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}get/`,
  ArticlesInstanceDoesNotExist: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}articlesInstanceDoesNotExist`;
      this.message = "ArticlesInstance does not exist.";
    }
  },
  ArticlesInstanceNotInProperState: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}articlesInstanceNotInProperState`;
      this.message = "ArticlesInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  NewspaperDaoGetFailed: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}newspaperDaoGetFailed`;
      this.message = "Get newspaper by newspaper DAO get failed.";
    }
  } 
};

const List = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}list/`,
  ArticlesInstanceDoesNotExist: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}articlesInstanceDoesNotExist`;
      this.message = "ArticlesInstance does not exist.";
    }
  },
  ArticlesInstanceNotInProperState: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}articlesInstanceNotInProperState`;
      this.message = "ArticlesInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuArticlesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  } 
};

module.exports = {
  Get,
  Update,
  Create,
  List
};
