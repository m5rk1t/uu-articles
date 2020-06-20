"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewspaperMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, language: 1 });
  }

}

module.exports = NewspaperMongo;
