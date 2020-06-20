"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const AUTHOR_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}author/`;

const Create = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
