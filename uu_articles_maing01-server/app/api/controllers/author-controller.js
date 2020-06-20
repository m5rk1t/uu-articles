"use strict";
const AuthorAbl = require("../../abl/author-abl.js");

class AuthorController {

  create(ucEnv) {
    return AuthorAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AuthorController();
