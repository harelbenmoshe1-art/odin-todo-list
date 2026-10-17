import { createTodo } from './todo.js';

const testTodo = createTodo('Finish Todo List', 'Complete the Odin Project assignment', '2026-10-25', 'High');
console.log(testTodo.getDetails());