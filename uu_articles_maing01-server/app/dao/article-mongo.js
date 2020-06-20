"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ArticleMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, "topicIdList.id": 1 });
    await super.createIndex({ awid: 1, publicationDate: 1, "topicIdList.id":1 });
    await super.createIndex({ awid: 1, authorId: 1 });
    await super.createIndex({ awid: 1, newspaperId: 1 });
  }

}

module.exports = ArticleMongo;
