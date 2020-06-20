"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 }, { unique: true });
  }

}

module.exports = TopicMongo;
