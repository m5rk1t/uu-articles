"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/author-error.js");

const WARNINGS = {

};

class AuthorAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "author-types.js"));
    this.dao = DaoFactory.getDao("author");
  }

  async create(awid, dtoIn) {
    
  }

}

module.exports = new AuthorAbl();
