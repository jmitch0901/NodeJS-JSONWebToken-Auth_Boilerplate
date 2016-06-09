const Passport = require('passport'),
  PassportJwt = require('passport-jwt'),
  PassportLocal = require('passport-local'),
  UserSchema = require('../models/user'),
  JWT_SECRET = require('../config').JWT_SECRET,
  Bcrypt = require('bcrypt-nodejs')
  ;

const JwtOptions = {
  jwtFromRequest: PassportJwt.ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
};

const LocalOptions = {
  usernameField: 'email'
};

module.exports = function(){

  const JwtStrategy = new PassportJwt.Strategy(JwtOptions, function(payload, done){
    UserSchema.findById(payload.sub, function(err,user){
      if(err)
        return done(err,false);
      if(!user)
        return done(null,false);

      return done(null,user);
    });
  });

  const LocalStrategy = new PassportLocal.Strategy(LocalOptions, function(email,password, done){

    UserSchema.findOne({email:email},function(err,user){
      if(err)
        return done(err);

      if(!user)
        return done(null,false);

      //now compare passhash
      user.comparePassword(password,function(err,isMatch){
        if(err)
          return done(err);

        if(!isMatch)
          return done(null,false);

        return done(null,user);
      });

    });

  });


  Passport.use(JwtStrategy);
  Passport.use(LocalStrategy);


};
