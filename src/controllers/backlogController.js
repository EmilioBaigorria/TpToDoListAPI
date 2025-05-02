
const Backlog=require("../models/backlog.model");
const Task = require("../models/task.model");

exports.getBacklog=async(req,res)=>{
    try {
        const back=await Backlog.find().populate("tareas")
        res.json(back)
    } catch (error) {
        console.error('Ocurrio un error durante la obtencion del backlog:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la obtencion del backlog' });
    }
}
exports.createBacklog=async(req,res)=>{
    try {
        const newBack=new Backlog(req.body)
        const newData=await newBack.save()
        res.status(201).json(newData)
    } catch (error) {
        console.error('Ocurrio un error durante la creacion del backlog:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la creacion del backlog' });
    }
}
exports.addTaskToBacklog=async(req,res)=>{
    try {
        const newTask=await Task.findById(req.params.taskId)
        if(newTask){
            const back=await Backlog.findOne()
            back.tareas.push(newTask)
            const newBack=await back.save()
            res.status(201).json(newBack)
            return
        }
        res.status(404).json({ message: 'El ID utilizado no es valido'})
    } catch (error) {
        console.error('Ocurrio un error durante el proceso de añadir una nueva tarea al backlog:', error);
        res.status(500).json({ message: 'Ocurrio un error durante el proceso de añadir una nueva tarea al backlog' });
    }
}
exports.deleteTaskInBacklogById=async(req,res)=>{
    try {
        const taskId=req.params.taskId
        const backlog=await Backlog.findOne()
        if(backlog){
            const newTaskList=backlog.tareas.filter((el)=>el._id.toString()!==taskId)
            backlog.tareas=newTaskList
            await backlog.save()
            res.status(201).json(backlog)
        }
    } catch (error) {
        console.error('Ocurrio un error durante el proceso de eliminar una tarea al backlog:', error);
        res.status(500).json({ message: 'Ocurrio un error durante el proceso de eliminar una tarea al backlog' });
    }
}