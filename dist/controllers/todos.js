"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const fs_1 = require("fs");
const todo_1 = require("../models/todo");
const path_1 = __importDefault(require("path"));
const DATA_FILE = path_1.default.join(__dirname, '../../data', 'todos.json');
class TodoController {
    constructor() {
        this.createTodo = async (req, res, next) => {
            try {
                const task = req.body.task;
                const newTodo = new todo_1.Todo(Math.random().toString(), task);
                const todos = await this.readTodosFromFile();
                todos.push(newTodo);
                await this.writeTodosToFile(todos);
                res.status(201).json({
                    message: "Todo created",
                    todo: newTodo
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTodos = async (req, res, next) => {
            try {
                const todos = await this.readTodosFromFile();
                res.status(200).json({
                    tasks: todos
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTodo = async (req, res, next) => {
            try {
                const todoId = req.params.id;
                const updatedTask = req.body.task;
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
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteTodo = async (req, res, next) => {
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
            }
            catch (error) {
                next(error);
            }
        };
    }
    async readTodosFromFile() {
        try {
            const data = await fs_1.promises.readFile(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    async writeTodosToFile(todos) {
        await fs_1.promises.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
    }
}
exports.TodoController = TodoController;
