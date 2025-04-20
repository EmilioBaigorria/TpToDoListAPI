const express = require('express');
const taskRouter = express.Router();
const taskController=require("../controllers/taskController")

taskRouter.get('/task', taskController.getAllTasks);
taskRouter.get('/task/byId/:id',taskController.getTaskById)
taskRouter.post('/task',taskController.createTask)
taskRouter.put('/task/updateById/:id',taskController.updateTask)
taskRouter.delete('/task/deleteById/:id',taskController.deleteTareaById)
module.exports = taskRouter;