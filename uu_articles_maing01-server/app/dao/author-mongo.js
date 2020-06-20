"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AuthorMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

}

module.exports = AuthorMongo;
