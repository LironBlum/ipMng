const app = require('./app')
const conf = require('./conf.json')

app.init().then( () => {
  app.use(routeNotFound)
  app.set('port', conf.port)
  
  const server = app.listen(app.get('port'), () => {
    console.log(`server running → PORT ${server.address().port}, Using HTTP`)
  });
}).catch( err => {
  console.log('App initialize error', err)
});

/**
 * @name routeNotFound
 * @description catch a not found route 
 * @param req
 * @param res
 * @param next
 */
const routeNotFound = (req, res, next) => {
  return res.status(404).json({
    message: `${req.url} Not found`
  });
  return false;
};