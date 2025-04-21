const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskController");
const Task = require("../models/task.model");
const { Types } = require("mongoose");

const validateId= async(req,res,next)=>{
    const taskId=req.params.id
    if(!Types.ObjectId.isValid(taskId)){
        return res.status(404).json({message:"El id proporcionado no es un id valido"})
    }
    res.taskId=taskId
    next()
}
taskRouter.get("/task", taskController.getAllTasks);
taskRouter.get("/task/byId/:id",validateId, taskController.getTaskById);
taskRouter.post("/task", taskController.createTask);
taskRouter.put("/task/updateById/:id",validateId, taskController.updateTask);
taskRouter.delete("/task/deleteById/:id",validateId, taskController.deleteTareaById);
module.exports = taskRouter;
