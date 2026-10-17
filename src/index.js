import { createTodo } from './todo.js';
import { createProject } from './project.js';

const projects = [];

const defaultProject = createProject('Default');
projects.push(defaultProject);

const sampleTodo = createTodo('Rock Climbing', 'Climb russians-in-space 8b', '2026-12-20', 'High');
defaultProject.addTodo(sampleTodo);

console.log(`Current Project: ${defaultProject.name}`);
console.log('Todos:', defaultProject.getTodos());