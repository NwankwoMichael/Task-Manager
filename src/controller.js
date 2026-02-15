import * as model from "./model.js";
import formView from "./views/formView.js";
import taskView from "./views/taskView.js";
import filterView from "./views/filterView.js";

// FORMVIEW Render Task Feature
const controlFormView = function () {
  // Read input value from view
  const input = formView.getInput();

  //   Create a task object via the model
  const task = model.createTask(input);

  //   Add it to state.tasks
  model.addTask(task);

  //   Save to localStorage
  model.saveTasks();

  //   Call the renderTask function
  formView.renderTask(task);
};

// TASKVIEW Toggle Feature
const controlTaskViewToggle = function (id) {
  // toggle task
  model.toggleTask(id);

  //  save task
  model.saveTasks();

  // Update task
  taskView.updateDOMAfterToggle(id);
};

// TaskView Task Delete Feature
const controlTaskViewDelete = function (id) {
  const tasks = model.getTasks();

  // Delete task
  model.deleteTask(id);

  // Sava task
  model.saveTasks();

  if (!tasks || tasks.length === 0) {
    formView.renderAll(tasks);
  } else {
    // Update taskView
    taskView.updateRenderAfterDelete(id);
  }
};

// FilterView Filter Feature
const controlFilterDelegation = function (filterType) {
  // Filter task
  const taskCondition = model.filterTasks(filterType);

  // Save Task
  model.saveTasks();

  // Re-render view
  filterView.renderFilter(taskCondition);
};

// Bulk action features
const controlJustVisualEffects = function () {
  console.log("Works");
};

const controlBulkAction = function (tasksType) {
  // Update state
  if (tasksType === "completed") {
    model.markAllTasksCompleted();

    // Update view via renderFilter
    filterView.renderFilter(model.getTasks());
  }

  if (tasksType === "all") {
    model.deleteAllTasks();
    formView.renderAll();
  }

  // Persist state
  model.saveTasks();
};

// LOADPAGE
const controlLoadPage = function () {
  model.migrateTasks();

  formView.renderAll(model.state.tasks);
};

const init = () => {
  formView.addHandlerRender(controlFormView);
  formView.addHandlerLoadPage(controlLoadPage);
  taskView.addHandlerToggleCompleted(controlTaskViewToggle);
  taskView.addHandlerDeleteTask(controlTaskViewDelete);
  filterView.addHandlerFilter(controlFilterDelegation);
  filterView.addHandlerMenuIconClick(controlJustVisualEffects);
  filterView.addHandlerBulkBtns(controlBulkAction);
  filterView.addHandlerCloseModalDelegation(controlJustVisualEffects);
  filterView.addHandlerCloseModalByESC(controlJustVisualEffects);
};

init();
