import formView from "./formView.js";
import {
  twitchStyle,
  removeModalEffect,
  hideModalAndOverlay,
} from ".././helper.js";

class FilterView {
  _filterContainer = document.querySelector(".filter__container");
  _filterBtns = document.querySelectorAll(".btn__filter");
  _taskListEl = document.querySelector(".task-list");
  _generalContainer = document.querySelector(".general__container");
  _overlayEl = document.querySelector(".overlay");
  _modalEl = document.querySelector(".modal");
  _bulkBtnBoxEl = document.querySelector(".bulk-btn_box");
  _bulkBtnEl = document.querySelectorAll(".bulk_btn");
  _menuIconEl = document.querySelector(".menu-icon");

  renderFilter(taskCondition) {
    // Clearing the current TaskList
    this._taskListEl.innerHTML = "";

    // LOOP through the filtered tasks
    taskCondition.forEach((task) => {
      // Html markup
      const html = formView._generateMarkup(task);

      // Inserting HTML markup
      this._taskListEl.insertAdjacentHTML("afterbegin", html);
    });

    if (taskCondition.length === 0) {
      this._menuIconEl.classList.add("hide");
    } else {
      this._menuIconEl.classList.remove("hide");
    }
  }

  addHandlerFilter(handler) {
    this._filterContainer.addEventListener("click", (e) => {
      //   Selecting all the filter buttons as event target
      const target = e.target.closest(".btn__filter");
      if (!target) return;

      // Remove active_btn class from all filter btn
      this._filterBtns.forEach((btn) => btn.classList.remove("active__filter"));

      // Type of filter button that was clicked
      let filterType;

      //   Display All tasks if All button is clicked
      if (target.classList.contains("btn_all")) {
        filterType = "All";

        // Add active__filter class
        target.classList.add("active__filter");
      }

      //   Display completed === false tasks if Active Btn is clicked
      if (target.classList.contains("btn_active")) {
        filterType = "Active";

        // Add active__filter class
        target.classList.add("active__filter");
      }

      //   Display Completed === true tasks if Completed target clicked
      if (target.classList.contains("btn_completed")) {
        filterType = "Completed";

        // Add active__filter class
        target.classList.add("active__filter");
      }

      handler(filterType);
    });
  }

  // Bulk Actions Handler
  addHandlerMenuIconClick() {
    this._generalContainer.addEventListener("click", (e) => {
      const target = e.target.closest(".menu-icon");
      if (!target) return;

      // Display overlay, hide menu icon and display modal
      twitchStyle(this._overlayEl, this._modalEl, target, "remove", "add");

      // Display bulk buttons
      removeModalEffect(this._bulkBtnEl, 1, "visible", "auto");
    });
  }

  addHandlerBulkBtns(handler) {
    this._bulkBtnBoxEl.addEventListener("click", (e) => {
      const menuIcon = this._generalContainer.querySelector(".menu-icon");
      const bulkMark = e.target.closest(".bulk__mark");
      const bulkDelete = e.target.closest(".bulk__delete");

      if (!bulkMark && !bulkDelete) return;

      let tasksType;

      if (bulkMark) {
        tasksType = "completed";
        // Hide overlay, display menu icon and hide modal
        twitchStyle(this._overlayEl, this._modalEl, bulkMark, "add", "remove");

        // Hide bulk buttons
        removeModalEffect(this._bulkBtnEl, 0, "hidden", "none");
        menuIcon.classList.remove("hide");
      }

      if (bulkDelete) {
        tasksType = "all";
        // Hide overlay, display menu icon and hide modal
        twitchStyle(
          this._overlayEl,
          this._modalEl,
          bulkDelete,
          "add",
          "remove",
        );

        // Hide bulk buttons
        removeModalEffect(this._bulkBtnEl, 0, "hidden", "none");
      }

      handler(tasksType);
    });
  }

  addHandlerCloseModalByBtn() {
    this._generalContainer.addEventListener("click", (e) => {
      const closeModalBtn = e.target.closest(".close-modal__btn");
      if (!closeModalBtn) return;

      hideModalAndOverlay(
        this._overlayEl,
        this._modalEl,
        this._bulkBtnEl,
        this._menuIconEl,
      );
    });
  }

  addHandlerCloseModalByOverlayClick() {
    this._generalContainer.addEventListener("click", (e) => {
      const target = e.target.closest(".overlay");
      if (!target) return;

      hideModalAndOverlay(
        this._overlayEl,
        this._modalEl,
        this._bulkBtnEl,
        this._menuIconEl,
      );
    });
  }

  addHandlerCloseModalByESC() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape")
        hideModalAndOverlay(
          this._overlayEl,
          this._modalEl,
          this._bulkBtnEl,
          this._menuIconEl,
        );
    });
  }

  addHandlerCloseModalDelegation(e) {
    const closeModalBtn =
      this._generalContainer.querySelector(".close-modal__btn");
    const target = this._overlayEl;

    if (closeModalBtn) this.addHandlerCloseModalByBtn();

    if (target) this.addHandlerCloseModalByOverlayClick();
  }
}

export default new FilterView();
