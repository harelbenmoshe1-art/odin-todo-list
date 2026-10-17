import { createProject } from './project.js';
import { createTodo } from './todo.js';

let projects = [];
let currentProject = null;

export const initData = () => {
  const defaultProject = createProject('Default');
  projects.push(defaultProject);
  currentProject = defaultProject;

  const sampleTodo = createTodo('Rock Climbing', 'Climb russians-in-space 8b', '20-12-2026', 'High');
  defaultProject.addTodo(sampleTodo);
};

export const getProjects = () => projects;
export const getCurrentProject = () => currentProject;

export const setCurrentProject = (projectName) => {
  const found = projects.find(proj => proj.name === projectName);
  if (found) currentProject = found;
};

export const addNewProject = (name) => {
  if (name && !projects.some(proj => proj.name === name)) {
    projects.push(createProject(name));
  }
};

export const addTodoToCurrentProject = (title, description, dueDate, priority) => {
  const newTodo = createTodo(title, description, dueDate, priority);
  currentProject.addTodo(newTodo);
};

export const removeTodoFromCurrentProject = (index) => {
  currentProject.removeTodo(index);
};