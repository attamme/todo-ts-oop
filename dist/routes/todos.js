"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
const todoController = new todos_1.TodoController();
router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
// - have to be commented when not in use
exports.default = router;
// This code defines a router for handling HTTP requests related to "todos".
