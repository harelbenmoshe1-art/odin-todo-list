import { createProject } from './project.js';
import { createTodo } from './todo.js';

let projects = [];
let currentProject = null;

const saveToStorage = () => {
  localStorage.setItem('odin_todo_projects', JSON.stringify(projects));
};

export const initData = () => {
  const savedData = localStorage.getItem('odin_todo_projects');

  if (savedData) {
    const rawProjects = JSON.parse(savedData);

    projects = rawProjects.map(rawProj => {
      const project = createProject(rawProj.name);
      if (rawProj.todos && Array.isArray(rawProj.todos)) {
        rawProj.todos.forEach(rawTodo => {
          const todo = createTodo(
            rawTodo.title,
            rawTodo.description,
            rawTodo.dueDate,
            rawTodo.priority,
            rawTodo.completed // restore completion status
          );  
          project.addTodo(todo);
        });
      }
      return project;
    });

    currentProject = projects[0] || null;
  } else {
    // create default project if storage is empty
    const defaultProject = createProject('Default');
    projects.push(defaultProject);
    currentProject = defaultProject;

    const sampleTodo = createTodo('Complete Odin Todo', 'Build app logic and DOM modules', '30-10-2026', 'High');
    defaultProject.addTodo(sampleTodo);
    saveToStorage();
  }
};

export const getProjects = () => projects;
export const getCurrentProject = () => currentProject;

export const setCurrentProject = (projectName) => {
  const found = projects.find(p => p.name === projectName);
  if (found) currentProject = found;
};

export const addNewProject = (name) => {
  if (name && !projects.some(p => p.name === name)) {
    projects.push(createProject(name));
    saveToStorage(); // save after adding project
  }
};

export const addTodoToCurrentProject = (title, description, dueDate, priority) => {
  if (currentProject) {
    const newTodo = createTodo(title, description, dueDate, priority);
    currentProject.addTodo(newTodo);
    saveToStorage(); // save after adding todo
  }
};

export const removeTodoFromCurrentProject = (index) => {
  if (currentProject) {
    currentProject.removeTodo(index);
    saveToStorage(); // save after deleting todo
  }
};

export const toggleTodoCompletionInActive = (index) => {
  if (currentProject) {
    const todos = currentProject.getTodos();
    if (todos[index]) {
      todos[index].toggleCompleted();
      saveToStorage(); // save after toggling complete
    }
  }
};