const Sprint=require("../models/sprint.model");
const Task = require("../models/task.model");

exports.getAllSprints=async(req,res)=>{
    try {
        const sprints=await Sprint.find().populate("tareas")
        res.json(sprints)
    } catch (error) {
        console.error('Ocurrio un error durante la obtencion de todos los sprints:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la obtencion de todos los sprints' });
    }
}
exports.getSprintById=async(req,res)=>{
    try {
        const sprintId=req.params.id
        const lookSprint=await Sprint.findById(sprintId).populate("tareas")
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
        const lookSprint=await Sprint.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(req.body.tareas.length>0){
            req.body.tareas.map(async(el)=>{
                let castedTask=await Task.castObject(el)
                await Task.findByIdAndUpdate(castedTask._id,castedTask,{new:true})
            })
        }
        if(!lookSprint){
            console.log("El Sprint no pudo ser actulizada")
            res.status(404).json({ message: 'El Sprint no pudo ser actulizada' });
        }
        res.status(200).json(lookSprint)
    } catch (error) {
        console.error('Ocurrio un error durante la edicion de un Sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la edicion de un Sprint' });
    }
}
exports.deleteSprintById=async(req,res)=>{
    try {
        const deletedSprint=await Sprint.findByIdAndDelete(res.sprintId)
        res.status(200).json({message:"Sprint eliminado exitosamente"})
    } catch (error) {
        console.error('Ocurrio un error durante la eliminacion de un sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante la eliminacion de un sprint' });
    }
}
exports.addTaskToSprint=async(req,res)=>{
    try {
        const newTask=await Task.findById(req.params.taskId)
        if(newTask){
            const lookSprint=await Sprint.findById(req.params.id)
            lookSprint.tareas.push(newTask)
            const savedSprint=await lookSprint.save()
            res.status(200).json(savedSprint)
            return
        }
        res.status(404).json({ message: 'Error'})
        
    } catch (error) {
        console.error('Ocurrio un error durante el proceso de agregar una nueva tarea al sprint:', error);
        res.status(500).json({ message: 'Ocurrio un error durante el proceso de agregar una nueva tarea al sprint' });
    }
}

exports.deleteTaskInSprintById = async (req, res) => { 
    try {
        const {taskId,id}=req.params
        const sprint=await Sprint.findById(id);
        if(sprint){
            const updatedTaskList=sprint.tareas.filter((el)=>{
                el.id!==taskId
            })
            sprint.tareas=updatedTaskList
            const newSprint= await sprint.save()
            res.status(200).json(newSprint)
            return
        }
        res.status(404).json({ message: "El id indicado no es valido" });
    } catch (error) {
        console.error("Ocurrio un error durante el proceso de eliminar una tarea de un sprint:", error);
        res.status(500).json({message:"Ocurrio un error durante el proceso de eliminar una tarea de un sprint"});
    }
};
exports.changeTaskStateOnSprint=async (req,res)=>{
    try {
        const {taskId,newState}=req.params
        const task=await Task.findByIdAndUpdate(taskId,{estado:newState},{new:true})
        if(task){
            res.status(200).json(task)
            return
        }
        res.status(404).json({message:"El id indicado no es valido"})
        
    } catch (error) {
        res.status(500).json({message:"Ocurrio un error durante el proceso de cambiar el estado de una tarea",error});
    }
}
