const UserSchema = require('../models/user'),
  JwtSimple = require('jwt-simple'),
  JWT_SECRET = require('../config').JWT_SECRET
  ;

function genToken(user){
    const timestamp = new Date().getTime();
    return JwtSimple.encode({ sub:user.id, iat: timestamp },JWT_SECRET);
}

exports.signup = function(req,res,next){

  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(400).json({error:'Provide and email and password!'});
  }

  UserSchema.findOne({ email:email },function(err,user){

    if(err)
      return next(err);

    if(user)
      return res.status(409).json({error: 'User with that email already exists!'});

    const newUser = new UserSchema({
      email:email,
      password: password
    });

    newUser.save(function(err,user){
      if(err)
        return next(err);

      return res.json({ token:genToken(user) })
    });


  });

};

exports.signin = function(req,res,next){

  return res.json({token:genToken(req.user)});

};
