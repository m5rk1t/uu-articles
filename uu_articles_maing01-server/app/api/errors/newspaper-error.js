"use strict";

const UuArticlesError = require("./uu-articles-error.js");
const NEWSPAPER_ERROR_PREFIX = `${UuArticlesError.ERROR_PREFIX}newspaper/`;


const Create = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}create/`,
  
};

const Update = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}update/`,
  
};

module.exports = {
  Update,
  Create,
  
};
