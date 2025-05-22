import { Router } from 'express';
import { createTodo, getTodos } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos); // - have to be commented when not in use
// router.patch('/:id')
// router.delete('/:id') 
// - have to be commented when not in use

export default router;
// This code defines a router for handling HTTP requests related to "todos".