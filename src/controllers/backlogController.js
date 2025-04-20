
const Backlog=require("../models/backlog.model");
const Task = require("../models/task.model");

exports.getBacklog=async(req,res)=>{
    try {
        const back=await Backlog.find()
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
            back.tasks.push(newTask)
            const newBack=await back.save()
            res.status(201).json(newBack)
        }
        res.status(404).json({ message: 'El ID utilizado no es valido'})
    } catch (error) {
        console.error('Ocurrio un error durante el proceso de añadir una nueva tarea al backlog:', error);
        res.status(500).json({ message: 'Ocurrio un error durante el proceso de añadir una nueva tarea al backlog' });
    }
}