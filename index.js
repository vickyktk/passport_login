const express = require('express')
const bodyparser = require('body-parser')
const router = express.Router();
const flash=require('express-flash')
const session=require('express-session')
const passport = require('passport')
const expressValidator = require('express-validator')
const expressLayouts=require('express-ejs-layouts')
// Passport Config
require('./config/passport')(passport);






var mysql = require('./Model/db')
const app = express();


app.use(expressLayouts)
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


app.set('view engine','ejs')

app.use('/style',express.static('style'))
app.use(session({
    secret:'myApp',
    resave:false,
    saveUninitialized:false
}))
app.use(flash())
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*',(req,res,next)=>{
  res.locals.user=req.user || null;
    next();
})

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user=req.user || null;
    
    next();
})



let urlEncoded = bodyparser.urlencoded({extended:false})



function loggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }else{
    res.redirect('Login')
  }
}

 
function notLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    res.redirect('Dashboard')
  }else{
   return next()
  }
}

app.get('/',(req,res)=>{
    res.render('Home')
})

app.get('/Register',notLoggedIn,(req,res)=>{
    res.render('Register')
})

app.get('/Login',notLoggedIn,(req,res)=>{
    res.render('Login')
})

app.get('/Dashboard',loggedIn,(req,res)=>{

    res.render('Dashboard');

  })




app.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','You are logged out')
  res.redirect('Login')
})


var products = require('./Routes/products')
app.use('/products',loggedIn,urlEncoded,products)

var routes=require('./Routes/userHandle')

app.post('/Register',notLoggedIn,urlEncoded,routes.Register)

app.post('/Login',notLoggedIn,urlEncoded,routes.Login)



app.listen(3000,()=>{
  console.log('Server Running on port 3000')
})