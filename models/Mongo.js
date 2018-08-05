'use strict'
const Promise = require('bluebird'); 
const MongoClient = require('mongodb').MongoClient; 
const conf = require('../conf.json');
Promise.promisifyAll(MongoClient);

let inst = null;

class Mongo {
  constructor() {
    if(!inst){
      inst = this;
      this.dbConnect = `mongodb://${conf.mongo.host}:${conf.mongo.port}/${conf.mongo.db}`
    }
    return inst
  }

  async connectToMongo () {
    try{
      this.dbClient = await MongoClient.connectAsync(this.dbConnect)
    } catch (err) { throw err }
  }

 /**
 * @name insertIp
 * @description insert ip to mongoDb
 * @param collection
 * @param ip
 */
  insertIp(collection ,ip) {
    return this.dbClient.collection(collection).insert({ ip: ip })
  }

 /**
 * @name getCollectionSize
 * @description returns the size of a mongoDb collection
 * @param collection
 */
  getCollectionSize(collection) {
    return this.dbClient.collection(collection).stats()
    .then(function(stats){
      return stats.count
    }).catch(function(err) {console.error(err) })
  }

 /**
 * @name getLastInsert
 * @description returns the last inserted document from MongoDb
 * @param collection
 */
  getLastInsert(collection) {
    return this.dbClient.collection(collection).find({}).sort({_id:-1}).limit(1).toArray() 
    .then(function(lastIp){
      return lastIp[0].ip
    }).catch(function(err) {console.log(err) })
  }
}

module.exports = Mongo;