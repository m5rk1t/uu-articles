"use strict";
const ArticleAbl = require("../../abl/article-abl.js");

class ArticleController {

  delete(ucEnv) {
    return ArticleAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ArticleAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ArticleAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.session);
  }

}

module.exports = new ArticleController();
