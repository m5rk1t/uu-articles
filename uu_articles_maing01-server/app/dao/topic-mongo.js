"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
class TopicMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 }, { unique: true });
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

  async delete(awid, id) {
    let filter = {
      awid: awid,
      id: id
    };
    return await super.deleteOne(filter);
  }

  async listByTopicIdList(awid, topicIdList, pageInfo) {
    let query = {
      awid,
      _id: {
        $in: topicIdList.map(id => new ObjectId(id))
      }
    };
    return await super.find(query, pageInfo);
  }
}

module.exports = TopicMongo;
