const Sprint = require("../models/sprint.model.js");
const Task=require("../models/task.model.js")

exports.getAllTasks=async(req,res)=>{
    try {
        const tasks=await Task.find()
        res.json(tasks)
    } catch (error) {
        console.error('Ocurrio un error durante la obtencion de todas las tareas:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la obtencion de todas las tareas' });
    }
}
exports.getTaskById=async(req,res)=>{
    try {
        const lookTask=await Task.findById(req.params.id)

        if(!lookTask){
            console.log("La tarea no fue encontrada")
            res.status(404).json({ message: 'La tarea no fue encontrada' });
        }
        res.json(lookTask)
    } catch (error) {
        console.error('Ocurrio un error durante la busqueda de una tarea:', error.message);
        res.status(500).json({ message: 'Ocurrio un error durante la busqueda de una tarea' });
    }
}
exports.createTask=async(req,res)=>{
    try {
        const newTask=new Task(req.body)
        const savedData=await newTask.save()
        res.status(201).json(savedData)
    } catch (error) {
        console.error('Ocurrio un error durante la creacion de una nueva tarea:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la creacion de una nueva tarea:' });
    }
}
exports.updateTask=async(req,res)=>{
    try {
        
        const lookTask=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!lookTask){
            console.log("La tarea no pudo ser actulizada")
            res.status(404).json({ message: 'La tarea no pudo ser actulizada' });
        }
        res.status(200).json(lookTask)
    } catch (error) {
        console.error('Ocurrio un error durante la edicion de una tarea:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la edicion de una tarea:' });
    }
}
exports.deleteTareaById=async(req,res)=>{
    try {
        const sprints=await Sprint.findOne({ tasks: req.params.id })
        if(sprints){
            return res.status(405).json({message:"La tarea no fue eliminada dado a que se encuntra en un sprint"})
        }
        const deletedTask=await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Tarea eliminada exitosamente"})
    } catch (error) {
        console.error('Ocurrio un error durante la eliminacion de una de las tareas: ', error);
        res.status(500).json({ message: 'Ocurrio un error durante la eliminacion de una de las tareas' });
    }
}


