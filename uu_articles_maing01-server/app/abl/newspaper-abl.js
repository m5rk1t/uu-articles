"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/newspaper-error.js");

const WARNINGS = {

};

class NewspaperAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "newspaper-types.js"));
    this.dao = DaoFactory.getDao("newspaper");
  }

  async update(awid, dtoIn) {
    
  }

  async create(awid, dtoIn) {
    
  }


}

module.exports = new NewspaperAbl();
