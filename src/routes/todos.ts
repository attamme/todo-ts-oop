import { Router } from 'express';
import { createTodo, getTodos, updateTodo } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo)
// router.delete('/:id') 
// - have to be commented when not in use

export default router;
// This code defines a router for handling HTTP requests related to "todos".