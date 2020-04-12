
var passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy,
FbStrategy=require('passport-facebook').Strategy,
User = require('../model/user');
keys=require('./keys')



passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    User.find({_id:id},(err,user)=>{
        done(err,user)
    })
})

passport.use('google',new GoogleStrategy({
clientID: keys.google.clientID,
clientSecret: keys.google.clientSecret,
callbackURL: "http://localhost:3000/google/callback"
},
(accessToken, refreshToken, profile, cb)=>{
var Name=profile.displayName;
var Email=profile._json.email
var googleID=profile.id
var FBID=''
var image=profile._json.picture

User.find({googleID:googleID},(err,user)=>{
    if(user.length>0){
        console.log('old user google')
        cb(null,user[0]);

    }else{
        
var newUser=new User({Name,Email,googleID,FBID,image})

newUser.save((err,user)=>{
    if(err) throw err;
    console.log('new user google')
    cb(null,user)
})

    }
})
}
))






//SetUP for FB login


passport.use('facebook',new FbStrategy({
clientID: keys.facebook.clientID,
clientSecret: keys.facebook.clientSecret,
callbackURL: "http://localhost:3000/facebook/callback",
profileFields: ['id', 'displayName', 'photos', 'email']
},
(accessToken, refreshToken, profile, cb)=>{
    var Name=profile._json.name;
    var Email=profile._json.email;
    var googleID='';
    var FBID=profile._json.id
    var image=profile.photos[0].value

    
User.find({FBID:FBID},(err,user)=>{
    if(user.length>0){
        console.log('old user fb')
        cb(null,user[0]);
    }else{
        
var newUser=new User({Name,Email,googleID,FBID,image})

newUser.save((err,user)=>{
    if(err) throw err;
    console.log('new user fb')
    cb(null,user);

})

    }
})
    
}
))
