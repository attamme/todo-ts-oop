"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
router.post('/', todos_1.createTodo);
router.get('/', todos_1.getTodos);
router.patch('/:id', todos_1.updateTodo);
// router.delete('/:id') 
// - have to be commented when not in use
exports.default = router;
// This code defines a router for handling HTTP requests related to "todos".
