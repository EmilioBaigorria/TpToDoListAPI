const express = require('express');
const backlogRouter= express.Router();
const backlogController=require("../controllers/backlogController");
const { Types } = require('mongoose');

const validateId= async(req,res,next)=>{
    const taskId=req.params.taskId
    if(!Types.ObjectId.isValid(taskId)){
        return res.status(404).json({message:"El id proporcionado no es un id valido"})
    }
    res.taskId=taskId
    next()
}

backlogRouter.get('/backlog', backlogController.getBacklog);
backlogRouter.post('/backlog',backlogController.createBacklog)
backlogRouter.put('/backlog/addTask/:taskId',validateId,backlogController.addTaskToBacklog)


module.exports = backlogRouter;