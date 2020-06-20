"use strict";
const ArticlesInstanceAbl = require("../../abl/articles-instance-abl.js");

class ArticlesInstanceController {

  load(ucEnv) {
    return ArticlesInstanceAbl.load(ucEnv.getUri().getAwid(), ucEnv.getAuthorizationResult());
  }
  init(ucEnv) {
    return ArticlesInstanceAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ArticlesInstanceController();
