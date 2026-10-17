const createProject = (name) => {
  const todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  const removeTodo = (index) => {
    todos.splice(index, 1);
  };

  const getTodos = () => todos;

  return {
    name,
    addTodo,
    removeTodo,
    getTodos
  };
};

export { createProject };