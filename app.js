const express = require('express');
const routes = require('./routes');
const Mongo = require('./models/Mongo')
const mongo = new Mongo()

const app = express();

app.use('/', routes);
app.use((req, res, next) => {
  const error = { error: `${req.url} Not found` };
  res.status(404)
  res.send(error)
})
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500
  res.status(status);
  res.send({ message: err.message, data: err.data || null });
})

app.init = () => Promise.all([
  mongo.connectToMongo()
])

module.exports = app;