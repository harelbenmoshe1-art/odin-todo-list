const createTodo = (title, description, dueDate, priority) => {
  let completed = false;

  const toggleCompleted = () => {
    completed = !completed;
  };

  const getDetails = () => {
    return `${title} - Due: ${dueDate} [Priority: ${priority}]`;
  };

  return {
    title,
    description,
    dueDate,
    priority,
    get completed() { return completed; },
    toggleCompleted,
    getDetails
  };
};

export { createTodo };