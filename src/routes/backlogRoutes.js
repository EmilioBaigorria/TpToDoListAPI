const express = require('express');
const backlogRouter= express.Router();
const backlogController=require("../controllers/backlogController")

backlogRouter.get('/backlog', backlogController.getBacklog);
backlogRouter.post('/backlog',backlogController.createBacklog)
backlogRouter.put('/backlog/addTask/:taskId',backlogController.addTaskToBacklog)


module.exports = backlogRouter;