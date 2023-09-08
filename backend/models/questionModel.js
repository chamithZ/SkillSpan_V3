const mongoose=require('mongoose')

const QestionSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true 
    },
    type:{  
        type:String
         
    },
    question:{  
        type:String,
        reqiured:true
    },
    output:{
        type:String,
        reqiured:true
    },
    answer:{
        type:String,
        reqiured:true
    },
    level:{
        type:String, 
        reqiured:true
    }, 
   
    
    HotelImg:{
        type:String}
    , 
    isApproved:{ // for admin
        type: Boolean,
        default: true,
    }
   
},{timestamps :true}) 

module.exports =  mongoose.model("Question",QestionSchema)    