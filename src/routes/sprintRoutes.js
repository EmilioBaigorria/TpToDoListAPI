const express = require('express');
const sprintRouter= express.Router();
const sprintController=require("../controllers/sprintController");
const { Types } = require('mongoose');

const validateId= async(req,res,next)=>{
    const sprintId=req.params.id
    const taskId=req.params.taskId
    if (!taskId){
        if(!Types.ObjectId.isValid(sprintId)){
            return res.status(404).json({message:"El id del sprint proporcionado no es un id valido"})
        }
        res.sprintId=sprintId
        next()
        return
    }
    if(!Types.ObjectId.isValid(sprintId)){
        return res.status(404).json({message:"El id del sprint proporcionado no es un id valido"})
    }
    if(!Types.ObjectId.isValid(taskId)){
        return res.status(404).json({message:"El id de la tarea proporcionado no es un id valido"})
    }
    res.taskId=taskId
    res.sprintId=sprintId
    next()
}


sprintRouter.get('/sprints', sprintController.getAllSprints);
sprintRouter.get('/sprints/byId/:id',validateId,sprintController.getSprintById)
sprintRouter.post('/sprints',sprintController.createSprint)
sprintRouter.put('/sprints/updateById/:id',validateId,sprintController.updateSprint)
sprintRouter.put('/sprints/:id/addTask/:taskId',validateId,sprintController.addTaskToSprint)
sprintRouter.delete('/sprints/deleteById/:id',validateId,sprintController.deleteSprintById)

module.exports = sprintRouter;