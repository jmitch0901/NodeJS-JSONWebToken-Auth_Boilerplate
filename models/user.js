const Mongoose = require('mongoose'),
  Bcrypt = require('bcrypt-nodejs'),
  JwtSimple = require('jwt-simple'),
  JWT_SECRET = require('../config').JWT_SECRET
  ;

const UserSchema = new Mongoose.Schema({
  email:{ type:String, unique: true, lowercase:true },
  password: String
});

UserSchema.methods.comparePassword = function(attemptedPassword, callbacks){
  Bcrypt.compare(attemptedPassword, this.password, function(err,isMatch){
    if(err)
      return callbacks(err);

    callbacks(null,isMatch);
  });
};

UserSchema.pre('save',function(next){
  const user = this;

  Bcrypt.genSalt(10,function(err,salt){
    if(err)
      return next(err);

    Bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err)
        return next(err);

      user.password = hash;
      next();
    });
  });
});



module.exports = Mongoose.model('User',UserSchema);
