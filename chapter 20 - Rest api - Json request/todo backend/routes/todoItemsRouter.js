// external modules
const express = require('express');
const todoItemRouter = express.Router();

//local module
const todoItemController = require('../controllers/todoItemController');

todoItemRouter.post('/', todoItemController.createTodoItem);
todoItemRouter.get('/', todoItemController.getTodoItem);
todoItemRouter.delete('/:id', todoItemController.deleteTodoItem);
todoItemRouter.put('/:id/completed', todoItemController.markCompleted);

module.exports = todoItemRouter;
