const express = require('express');
const sprintRouter= express.Router();
const sprintController=require("../controllers/sprintController")

sprintRouter.get('/sprints', sprintController.getAllSprints);
sprintRouter.get('/sprints/byId/:id',sprintController.getSprintById)
sprintRouter.post('/sprints',sprintController.createSprint)
sprintRouter.put('/sprints/updateById/:id',sprintController.updateSprint)
sprintRouter.put('/sprints/:id/addTask/:taskId',sprintController.addTaskToSprint)
sprintRouter.delete('/sprints/deleteById/:id',sprintController.deleteSprintById)

module.exports = sprintRouter;