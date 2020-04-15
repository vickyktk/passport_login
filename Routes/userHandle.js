const express = require('express')
const bcrypt=require('bcryptjs')
const flash=require('express-flash')
User = require('../model/user');
const expressValidator = require('express-validator')
const passport = require('passport')




//POST REQUEST TO REGISTER PAGE

module.exports.Register=function(req,res){
    var Name=req.body.Name;
    var Email=req.body.Email;
    var pass=req.body.Password;

    req.checkBody('Name','Name should be between 5 to 15 charachters').notEmpty().escape().isLength({min:5,max:15});
    req.checkBody('Email','Email is required').notEmpty();
    req.checkBody('Password','Password should be at least 6 charachters').notEmpty().isLength({min:6});    
    req.checkBody('Email','Not a valid email').isEmail(); 
    let costumErrors=req.validationErrors();
    

    if(costumErrors.length){

        res.render('Register',{costumErrors,
        Name,Email})
    }
    else{

        User.find({Email:Email},(err,user)=>{
            if(user.length>0){
                 costumErrors.push({msg:'Email already exist'})
                 res.redirect('/Register')

            }else{
                var data={
                    Name:Name,
                    Email:Email,
                    googleID:'',
                    FBID:'',
                    Image:'',
                    Password:pass
                }
                bcrypt.hash(data.Password,10,(err,hash)=>{
                    if(err) throw err;
                    data.Password=hash;

                    var newUser=new User(data)
                    newUser.save((err,user)=>{
                        if(err) throw err;
                        req.flash('success_msg','You are successfully registered ,now Login')
                        res.redirect('/Login')
                    })
                })


            }
        })
        
    }

    

}

//POST REQUEST TO LOGIN PAGE
module.exports.Login=function(req,res,next){
    passport.authenticate('local',{
        successRedirect:'/Dashboard',
        failureRedirect:'/Login',
        failureFlash:true,
        successFlash:true
    })(req,res,next)
    }
