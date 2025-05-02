const mongoose=require("mongoose")

const sprintSchema=new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    fechaInicio:{
        type:String,
        required:true,
    },
    fechaCierre:{
        type:String,
        requiered:true
    },
    tareas:[{
        type:mongoose.Schema.Types.ObjectId, ref:"Task"
    }]
})

const Sprint=mongoose.model("Sprint",sprintSchema)

module.exports=Sprint