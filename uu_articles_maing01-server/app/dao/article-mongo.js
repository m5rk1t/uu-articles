"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
class ArticleMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, topicIdList: 1 });
    await super.createIndex({ awid: 1, publicationDate: 1, topicIdList:1 });
    await super.createIndex({ awid: 1, authorId: 1 });
    await super.createIndex({ awid: 1, newspaperId: 1 });
  }

  async create(uuObject) {       
    return await super.insertOne(uuObject);
  }

  async list(awid, newspaperId, publicationDate, topicId,  pageInfo) {
    let filter = { awid };
    newspaperId && (filter.newspaperId = newspaperId);
    publicationDate && (filter.publicationDate = publicationDate);
    topicId && (filter.topicIdList = topicId);

    return await super.find(filter, pageInfo);
  }

  async listByPublicDateAndTopicId(awid, publicationDate, topicId, pageInfo) {
    if (!topicId){
      /* TODO: we can add listByPublicDate
      field topicIdList has at least one topic id; 
      * another solution with $or does not use compound index; 
      */
      topicId = { $exists: true }
    } else {
      topicId = new ObjectId(topicId);
    }
    return await super.find({ awid, publicationDate: publicationDate, topicIdList: topicId }, pageInfo);
  } 

  async listByTopicId(awid, topicId, pageInfo) {

    topicId = new ObjectId(topicId);
    return await super.find({ awid , topicIdList: topicId }, pageInfo);
  } 

}

module.exports = ArticleMongo;
