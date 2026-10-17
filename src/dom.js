import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  addNewProject,
  addTodoToCurrentProject,
  removeTodoFromCurrentProject,
} from './logic.js';

export const renderApp = () => {
  const content = document.getElementById('content');
  content.innerHTML = '';  // clear screen

  const appContainer = document.createElement('div');
  appContainer.classList.add('app-container');

  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');

  const projectsHeading = document.createElement('h2');
  projectsHeading.textContent = 'Projects';
  sidebar.appendChild(projectsHeading);

  const projectList = document.createElement('ul');
  getProjects().forEach(project => {
    const li = document.createElement('li');
    li.textContent = project.name;
    if (project === getCurrentProject()) li.classList.add('Current');

    li.addEventListener('click', () => {
      setCurrentProject(project.name);
      renderApp(); // re-render when switching projects
    });
    projectList.appendChild(li);
  });
  sidebar.appendChild(projectList);

  // new project button
  const newProjInput = document.createElement('input');
  newProjInput.placeholder = 'New project name...';
  const newProjBtn = document.createElement('button');
  newProjBtn.textContent = 'Add Project';
  newProjBtn.addEventListener('click', () => {
    if (newProjInput.value) {
      addNewProject(newProjInput.value);
      newProjInput.value = '';
      renderApp();
    }
  });
  sidebar.appendChild(newProjInput);
  sidebar.appendChild(newProjBtn);

  // main content area for todos
  const mainContent = document.createElement('div');
  mainContent.classList.add('main-content');

  const currentProjHeading = document.createElement('h1');
  currentProjHeading.textContent = getCurrentProject().name;
  mainContent.appendChild(currentProjHeading);

  // todo list view
  const todoList = document.createElement('ul');
  todoList.classList.add('todo-list');

  getCurrentProject().getTodos().forEach((todo, index) => {
    const todoCard = document.createElement('li');
    todoCard.classList.add('todo-card', `priority-${todo.priority.toLowerCase()}`);

    // title and due Date
    const summaryDiv = document.createElement('div');
    summaryDiv.classList.add('todo-summary');
    summaryDiv.innerHTML = `<strong>${todo.title}</strong> - Due: ${todo.dueDate}`;

    // expandable details view
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('todo-details', 'hidden');
    detailsDiv.innerHTML = `
      <p><strong>Description:</strong> ${todo.description}</p>
      <p><strong>Priority:</strong> ${todo.priority}</p>`;

    // toggle expand on click (excluding buttons)
    summaryDiv.addEventListener('click', () => {
      detailsDiv.classList.toggle('hidden');
    });

    // mark-completed dutton
    const completedBtn = document.createElement('button');
    completedBtn.textContent = 'Mark Completed';
    completedBtn.addEventListener('click', (event) => {
      removeTodoFromCurrentProject(index);
      renderApp();
    });

    todoCard.appendChild(summaryDiv);
    todoCard.appendChild(detailsDiv);
    todoCard.appendChild(completedBtn);
    todoList.appendChild(todoCard);
  });

  mainContent.appendChild(todoList);

  // form to add a new todo
  const addTodoForm = document.createElement('div');
  addTodoForm.classList.add('add-todo-form');
  addTodoForm.innerHTML = `
    <h3>Add Todo</h3>
    <input type="text" id="todo-title" placeholder="Title" required>
    <input type="text" id="todo-desc" placeholder="Description">
    <input type="date" id="todo-date" required>
    <select id="todo-priority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button id="submit-todo">Save Todo</button>
  `;

  addTodoForm.querySelector('#submit-todo').addEventListener('click', () => {
    const title = document.getElementById('todo-title').value;
    const desc = document.getElementById('todo-desc').value;
    const date = document.getElementById('todo-date').value;
    const priority = document.getElementById('todo-priority').value;

    if (title && date) {
      addTodoToCurrentProject(title, desc, date, priority);
      renderApp();
    }
  });

  mainContent.appendChild(addTodoForm);

  appContainer.appendChild(sidebar);
  appContainer.appendChild(mainContent);
  content.appendChild(appContainer);
};