const Sprint=require("../models/sprint.model");
const Task = require("../models/task.model");

exports.getAllSprints=async(req,res)=>{
    try {
        const sprints=await Sprint.find()
        res.json(sprints)
    } catch (error) {
        console.error('Ocurrio un error durante la obtencion de todos los sprints:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la obtencion de todos los sprints' });
    }
}
exports.getSprintById=async(req,res)=>{
    try {
        const lookSprint=await Sprint.findById(req.params.id)
        if(!lookSprint){
            console.log("El Sprint no fue encontrado")
            res.status(404).json({message:"El Sprint no fue encontrado"})
        }
        res.json(lookSprint)
    } catch (error) {
        console.error('Ocurrio un error durante la obtencion del sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la obtencion del sprint' });
    }
}
exports.createSprint=async(req,res)=>{
    try {
        const newSprint=new Sprint(req.body)
        const savedData=await newSprint.save()
        res.status(201).json(savedData)
    } catch (error) {
        console.error('Ocurrio un error durante la creacion del nuevo sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la creacion del nuevo sprint' });
    }
}
exports.updateSprint=async(req,res)=>{
    try {
        
        const lookTask=await Sprint.findByIdAndUpdate(req.params.id,req.body,{new:true})

        if(!lookTask){
            console.log("El Sprint no pudo ser actulizada")
            res.status(404).json({ message: 'El Sprint no pudo ser actulizada' });
        }
        res.status(200).json(lookTask)
    } catch (error) {
        console.error('Ocurrio un error durante la edicion de un Sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la edicion de un Sprint' });
    }
}
exports.addTaskToSprint=async(req,res)=>{
    try {
        const newTask=await Task.findById(req.params.taskId)
        if(newTask){
            const lookSprint=await Sprint.findById(req.params.id)
            lookSprint.tasks.push(newTask)
            const savedSprint=await lookSprint.save()
            res.status(200).json(savedSprint)
        }
        res.status(404).json({ message: 'El ID utilizado no es valido'})
        
    } catch (error) {
        console.error('Ocurrio un error durante el proceso de agregar una nueva tarea al sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante el proceso de agregar una nueva tarea al sprint' });
    }
}
exports.deleteSprintById=async(req,res)=>{
    try {
        const deletedSprint=await Sprint.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Sprint eliminado exitosamente"})
    } catch (error) {
        console.error('Ocurrio un error durante la eliminacion de un sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la eliminacion de un sprint' });
    }
}
