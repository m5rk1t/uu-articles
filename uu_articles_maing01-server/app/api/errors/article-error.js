"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const ARTICLE_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}article/`;

const Create = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}create/`,
  
};

const List = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}list/`,
  
};

module.exports = {
  List,
  Create
};
