const express = require('express')
const mysql = require('mysql')
const bcrypt=require('bcryptjs')
const flash=require('express-flash')
var conn = require('../Model/db')
const expressValidator = require('express-validator')
const passport = require('passport')



//POST REQUEST TO REGISTER PAGE

module.exports.Register=function(req,res){
    var Name=req.body.Name;
    var Email=req.body.Email;
    var country=req.body.select;
    var pass=req.body.Password;
    
    // //Validating the inputs
    //  var costumErrors=[];
    // if(!Name || !Email || !Email){
    //     costumErrors.push({msg:'Fill out all the fields'})

    // }
    // if(Name.length < 5){
    //     costumErrors.push({msg:'Name should be at least five characters'})

    // }
    // if(pass.length < 6){
    //     costumErrors.push({msg:'password must be at least six characters'})

    // }

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
        
    var select=`SELECT * FROM user WHERE email='${Email}'`;
    conn.query(select,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            var costumErrors=[]
            costumErrors.push({msg:'Email already exist'})
            res.render('Register',{
                costumErrors,
                Name,
                Email
            })
            
        }else{
            bcrypt.hash(pass,10,(err,hash)=>{
                if(err) throw err;
                var insert=`INSERT INTO user(Name,email,country,Password) VALUES
                ('${Name}','${Email}','${country}','${hash}')`;
    
                conn.query(insert,(err,result)=>{
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