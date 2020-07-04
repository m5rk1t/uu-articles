"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AuthorMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  } 

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id
    };
    return await super.findOne(filter);
  }

  async list(awid,  pageInfo) {
    let filter = { awid };

    return await super.find(filter, pageInfo);
  }
}

module.exports = AuthorMongo;
