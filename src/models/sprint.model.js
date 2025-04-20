const mongoose=require("mongoose")

const sprintSchema=new mongoose.Schema({
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
        requiered:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId, ref:"Task"
    }],
    color:{
        type:String,
        required:true
    }
})

const Sprint=mongoose.model("Sprint",sprintSchema)

module.exports=Sprint