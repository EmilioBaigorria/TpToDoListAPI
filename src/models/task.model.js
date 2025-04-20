const mongoose=require("mongoose")


const taskSchema=new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    description:String,
    state:{
        type:String,
        enum:['pendiente','enprogreso','terminada'],
        required:true
    },
    dueTime:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    }
})

const Task=mongoose.model("Task",taskSchema)

module.exports=Task