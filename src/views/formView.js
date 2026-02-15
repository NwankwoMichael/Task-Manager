class FormView {
  _formEl = document.querySelector(".form");
  _inputEl = document.querySelector(".input__field");
  _taskListEl = document.querySelector(".task-list");
  _menuIconEl = document.querySelector(".menu-icon");

  renderTask(task) {
    //  Remove empty state message if present
    const emptyMsg = this._taskListEl.querySelector(".empty-state");
    if (emptyMsg) emptyMsg.remove();

    const markup = this._generateMarkup(task);

    this._taskListEl.insertAdjacentHTML("afterbegin", markup);

    this._inputEl.value = "";

    this._menuIconEl.classList.remove("hide");
  }

  renderAll(tasks) {
    // Clearing task list
    this._taskListEl.innerHTML = "";

    if (!tasks || tasks.length === 0) {
      // Inserting friendly message in the case of empty taskLists
      this.emptyTaskListFriendlyMsg();
    } else {
      tasks.forEach((task) => {
        if (!task || !task.id) return;
        const html = this._generateMarkup(task);
        this._taskListEl.insertAdjacentHTML("afterbegin", html);
      });
      // Display menu icon only when tasks exist
      this._menuIconEl.classList.remove("hide");
    }
  }

  getInput() {
    return this._inputEl.value;
  }

  _generateMarkup = function (task) {
    // Markup
    return `
        <div class="task-list__container">
          <div class="pair">
          <button aria-label="${task.completed ? "Mark task as not completed" : "Mark task as completed"}">
            <svg class="icon ${task.completed ? "checked" : ""}" 
            aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 24 24">
              <path class="toggle_btn"
                d="M12 22C6.477 22 2 17.523 2 12 S6.477 2 12 2s10 4.477 10 10 -4.477 10-10 10z"
              />
               <path class="toggle_btn checkmark ${task.completed ? "" : "hide"}" d="M9 12l2 2 4-4 1.5 1.5-5.5 5.5-3.5-3.5z"/>

            </svg>
            </button>
            <li class="list__item ${task.completed ? "checked" : ""}" data-id="${task.id}" data-completed="${task.completed}">${task.text}</li>
          </div>
          <button aria-label="Delete task">
          <svg class="icon" aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 24 24">
            <path class="delete_btn"
              d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 0 1-1 .5H7.5a1 1 0 0 1-1-.5L5 9zm5 2v8h2v-8H10zm4 0v8h2v-8h-2zM9 4h6v2H9V4z"
            />
          </svg>
          </button>
        </div>

  `;
  };

  emptyTaskListFriendlyMsg() {
    this._taskListEl.innerHTML = "";

    this._taskListEl.insertAdjacentHTML(
      "beforeend",
      `<li class="empty-state">
            <span class="empty-icon">📝</span>
            <p>No tasks yet - add your first one !</p>
        </li>`,
    );
    this._menuIconEl.classList.add("hide");
    return;
  }

  _menuIconOperator() {
    if (!this._taskListEl || this._taskListEl.children.length === 0) {
      this._menuIconEl.classList.add("hide");
    } else {
      this._menuIconEl.classList.remove("hide");
    }
  }

  //   A function for handling the form submit event
  addHandlerRender(handler) {
    this._formEl.addEventListener("submit", function (e) {
      e.preventDefault();

      const addBtn = e.target.querySelector(".input__field");

      if (!addBtn) return;

      handler();
    });
  }

  addHandlerLoadPage(handler) {
    window.addEventListener("load", () => {
      // Hiding menu icon if tasklist is empty
      this._menuIconOperator();

      handler();
    });
  }
}
export default new FormView();
