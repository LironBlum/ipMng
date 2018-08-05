'use strict'
const Mongo = require('../models/Mongo')
const mongo = new Mongo()

exports.prev = async (req, res, next) => {
  try{
    const prevIp = await mongo.getLastInsert("prev")
    const ip = req.ip
    let status = 204
    let body = {}
    
    if(prevIp !== undefined){
      status = 200
      body = prevIp
    }
    mongo.insertIp("prev", ip)  
    res.status(status).send(body)

  } catch (err) {
    return next(err);
  }
};

exports.total = async (req, res) => {
  const ip = req.ip
  mongo.insertIp("total", ip)

  const prevsReqSum = await mongo.getCollectionSize("prev") 
  res.send(`${prevsReqSum}`)
};

exports.stats = async (req, res) => {
  const ip = req.ip
  const stats = {
    'statisticsForAllRequests':{
      prev: await mongo.getCollectionSize("prev"),
      stats: await mongo.getCollectionSize("stats"),
      total: await mongo.getCollectionSize("total")
    }
  }
  mongo.insertIp("stats", ip) 
  res.send(stats)
}
