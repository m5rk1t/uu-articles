"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const TOPIC_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
  
};

const Delete = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}delete/`,
  
};

module.exports = {
  Delete,
  Create
};
