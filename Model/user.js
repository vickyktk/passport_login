var mongoose=require('mongoose');
var keys=require('./../config/keys')


mongoose.connect(keys.mongo.url,{
useNewUrlParser:true,
useUnifiedTopology:true
},(err)=>{
    if(err) throw err;
    console.log('Mongodb Connected')
});



var schema=mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    googleID:{
        type:String,
        require:true
    },
    FBID:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})


var user=mongoose.model('googleUser',schema)


// user.find({_id:'5e8ec6bbfd96cf3ac4465e84'},(err,user)=>{
//     console.log(user)
// })


// user.deleteOne({_id:'5e91a90bc2a51c2e5831bd17'},(err)=>{
//     if(err) throw err;
//     user.find((err,user)=>{
//         console.log(user)
//     })
// })

// user.deleteMany((err)=>{
//     if(err) throw err;
//     user.find((err,user)=>{
//         console.log(user)
//     })
// })
module.exports=user;
