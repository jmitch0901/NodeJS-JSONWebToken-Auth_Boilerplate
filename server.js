const Express = require('express'),
  BodyParser = require('body-parser'),
  Http = require('http'),
  Morgan = require('morgan'),
  Mongoose = require('mongoose')
  ;

Mongoose.connect('mongodb://localhost:27017/ReactAuth');

//config passport
require('./config/passport.config')();

const App = Express();
const Routes = require('./routes');



  //App Setup
App.use(Morgan('combined'));
App.use(BodyParser.json());
App.use('/',Routes);


  //Server Setup
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '127.0.0.1';

const Server = Http.createServer(App);

Server.listen(PORT,IP,function(){
  console.log('Server listening on: ',PORT);
});
