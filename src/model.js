// State object
export const state = {
  tasks: [],
};

export const createTask = function (
  text,
  priority = "normal",
  category = "general",
) {
  // Guard clause
  if (!text) return null;
  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text: text,
    completed: false,
    priority: priority,
    category: category,
    createdAt: new Date().toLocaleTimeString(),
  };
  return task;
};

// Add new task
export const addTask = function (task) {
  if (!task) return console.error("Empty input ❌❌ Please input task");
  return state.tasks.push(task);
};

// Delete a task
export const deleteTask = function (id) {
  const curTask = state.tasks.find((task) => task.id === id);
  if (!curTask) return;
  const index = state.tasks.indexOf(curTask);
  if (index > -1) state.tasks.splice(index, 1);
};

// Mark task as complete or incomplete
export const toggleTask = function (id) {
  const complete = state.tasks.find((task) => task.id === id);
  if (!complete) return;
  complete.completed = !complete.completed;
};

// full tasks array
export const getTasks = function () {
  return state.tasks;
};

// Filter
export const filterTasks = function (filterType) {
  const arg = filterType.toLowerCase();

  const taskConditions = state.tasks.filter((task) => {
    if (arg === "all") return task;
    if (arg === "active") return task.completed === false;
    if (arg === "completed") return task.completed === true;
  });

  return taskConditions;
};

// Persist tasks
export const saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
};

export const loadTasks = function () {
  const storage = localStorage.getItem("tasks");

  if (storage) state.tasks = JSON.parse(storage);
};

// localStorage.clear();

export const migrateTasks = function () {
  // Loading Existing Tasks
  const storage = localStorage.getItem("tasks");

  if (!storage) return;

  //   Filter out invalid entries
  let tasks = JSON.parse(storage).filter(
    (task) => task && typeof task.text === "string" && task.text.trim() !== "",
  );

  //   Repair Missing Fields
  tasks = tasks.map((task) => {
    return (task = {
      id: task.id || Date.now() + Math.floor(Math.random() * 1000),
      text: task.text,
      completed: task.completed || false,
      priority: task.priority ?? "normal",
      category: task.category ?? "general",
      createdAt: task.createdAt ?? new Date().toLocaleTimeString(),
    });
  });

  //   Save Back to LocalStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //   Update State
  state.tasks = tasks;
};

export const deleteAllTasks = function () {
  state.tasks = [];
};

export const markAllTasksCompleted = function () {
  state.tasks.forEach((task) => (task.completed = true));
};
