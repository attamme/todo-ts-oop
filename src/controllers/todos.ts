import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import { Todo } from "../models/todo";
import path from "path";

const DATA_FILE = path.join(__dirname, '../../data', 'todos.json');

export class TodoController {
    private async readTodosFromFile(): Promise<Todo[]> {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            return JSON.parse(data) as Todo[];
        } catch (error) {
            return [];
        }
    }

    private async writeTodosToFile(todos: Todo[]): Promise<void> {
        await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
    }

    public createTodo = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const task = (req.body as { task: string }).task;
            const newTodo = new Todo(Math.random().toString(), task);

            const todos = await this.readTodosFromFile();
            todos.push(newTodo);
            await this.writeTodosToFile(todos);

            res.status(201).json({ 
                message: "Todo created", 
                todo: newTodo 
            });
        } catch (error) {
            next(error);        
        }
    }

    public getTodos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todos = await this.readTodosFromFile();
            res.status(200).json({ 
                tasks: todos 
            });
        } catch (error) {
            next(error);
        }
    }

    public updateTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id;
            const updatedTask = (req.body as { task: string }).task;

            const todos = await this.readTodosFromFile();
            const todoIndex = todos.findIndex(todo => todo.id === todoId);

            if (todoIndex < 0) {
                throw new Error("Todo not found");
            }

            todos[todoIndex].task = updatedTask;
            await this.writeTodosToFile(todos);

            res.status(200).json({ 
                message: "Todo updated",
                updatedTask: todos[todoIndex]
            });
        } catch (error) {
            next(error);
        }
    }

    public deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id;

            const todos = await this.readTodosFromFile();
            const updatedTodos = todos.filter(todo => todo.id !== todoId);

            if (todos.length === updatedTodos.length) {
                throw new Error("Todo not found");
            }

            await this.writeTodosToFile(updatedTodos);

            res.status(200).json({ 
                message: "Todo deleted" 
            });
        } catch (error) {
            next(error);
        }
    }
}