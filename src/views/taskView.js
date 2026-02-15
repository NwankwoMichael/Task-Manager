import formView from "./formView.js";

class TaskView {
  _taskListEl = document.querySelector(".task-list");
  _menuIconEl = document.querySelector(".menu-icon");

  getID(id) {
    return this._taskListEl.querySelector(`[data-id="${id}"]`);
  }

  updateDOMAfterToggle(id) {
    const task = this.getID(id);

    const icon = task.closest(".pair").querySelector(".icon");

    const checkmarkIcon = icon.querySelector(".checkmark");

    // Read Current Value
    const isCompleted = task.dataset.completed === "true";

    // Flip it
    task.dataset.completed = isCompleted ? "false" : "true";

    // Apply classes based on new value
    if (task.dataset.completed === "true") {
      task.classList.add("checked");
      icon.classList.add("checked");
      checkmarkIcon.classList.remove("hide");
    } else {
      task.classList.remove("checked");
      icon.classList.remove("checked");
      checkmarkIcon.classList.add("hide");
    }

    formView._menuIconOperator();
  }

  updateRenderAfterDelete(id) {
    // Locate task by id
    const task = this.getID(id);

    if (!task) return;

    // FInd task in the Lists of tasks
    const taskContainer = task.closest(".task-list__container");

    if (!taskContainer) return;

    const timeout = setTimeout(function () {
      // Delete task container
      taskContainer.remove();

      formView._menuIconOperator();
    }, 2000);
  }

  addHandlerToggleCompleted(handler) {
    this._taskListEl.addEventListener("click", function (e) {
      const target = e.target.closest(".toggle_btn");
      if (!target) return;

      const task = target.closest(".pair").querySelector(".list__item");
      const id = +task.dataset.id;

      handler(id);
    });
  }

  addHandlerDeleteTask(handler) {
    this._taskListEl.addEventListener("click", function (e) {
      const target = e.target.closest(".delete_btn");
      if (!target) return;

      const id = +target
        .closest(".task-list__container")
        .querySelector(".list__item").dataset.id;

      handler(id);
    });
  }
}

export default new TaskView();
