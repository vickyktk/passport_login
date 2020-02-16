const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser')
const conn = require('../Model/db');
const flash=require('express-flash')


module.exports = function(passport) {

  passport.use(new LocalStrategy({usernameField:'Email'},function(Email,password,done){
    var select=`SELECT * FROM user WHERE email='${Email}'`;
    conn.query(select,(err,user)=>{
        if(err) throw err;   
        if(user.length == 0 )
        {
            
            done(null,false,{message:'incorrect Login Information'})
            
        }
        else{
            bcrypt.compare(password,user[0].Password,(err,resdb)=>{
                if(err) throw err;
                if(resdb==true){
                    
                    done(null,user,{message:'Successfully logged in'})   
                }
                else{
                    
                    done(null,false,{message:'incorrect Login Information'})
                    
              }
            })
}

    })

  }))
  
  passport.serializeUser((user,done)=>{
    var id =user[0].id
    done(null,id)
})

passport.deserializeUser(function(id,done){
      var select=`SELECT * FROM user WHERE id='${id}'`;
  conn.query(select,(err,user)=>{
      done(err,user)
  })
})
}