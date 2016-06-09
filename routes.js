const Express = require('express'),
  AuthController = require('./controllers/auth'),
  Passport = require('passport')
  ;

const RootRouter = Express.Router({ mergeParams:true });


RootRouter.get('/',Passport.authenticate('jwt',{ session:false }),function(req,res){
  res.json({message: 'authenticated.'});
});

RootRouter.post('/signup',AuthController.signup);
RootRouter.post('/signin',Passport.authenticate('local',{ session:false }),AuthController.signin);



module.exports = RootRouter;
