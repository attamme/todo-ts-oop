import { Router } from 'express';
import { TodoController } from '../controllers/todos';

const router = Router();
const todoController = new TodoController();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo) 
// - have to be commented when not in use

export default router;
// This code defines a router for handling HTTP requests related to "todos".