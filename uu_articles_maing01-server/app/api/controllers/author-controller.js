"use strict";
const AuthorAbl = require("../../abl/author-abl.js");

class AuthorController {

  get(ucEnv) {
    return AuthorAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return AuthorAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }


  create(ucEnv) {
    return AuthorAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AuthorController();
