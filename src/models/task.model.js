const mongoose=require("mongoose")


const taskSchema=new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    descripcion:String,
    estado:{
        type:String,
        enum:['pendiente','activo','terminado'],
        required:true
    },
    fechaLimite:{
        type:String,
        required:true
    }
})

const Task=mongoose.model("Task",taskSchema)

module.exports=Task