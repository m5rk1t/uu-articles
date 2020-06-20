"use strict";
const ArticleAbl = require("../../abl/article-abl.js");

class ArticleController {

  list(ucEnv) {
    return ArticleAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ArticleAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ArticleController();
