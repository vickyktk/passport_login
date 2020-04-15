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
    Image:{
        type:String,
        require:true
    },
    Password:{
        type:String
    }
})


var user=mongoose.model('User',schema)

module.exports=user;
