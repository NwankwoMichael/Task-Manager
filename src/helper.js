export const twitchStyle = function (
  overlayEl,
  modalEl,
  target,
  removeProp,
  addProp,
) {
  overlayEl.classList[removeProp]("hide");
  target.classList[addProp]("hide");
  modalEl.classList[removeProp]("hide");
  modalEl.classList[addProp]("show-modal");
};

export const removeModalEffect = function (
  bulkBtnEl,
  opacityValue,
  visibility,
  pointerEvents,
) {
  bulkBtnEl.forEach((btn) => {
    btn.style.opacity = opacityValue;
    btn.style.visibility = visibility;
    btn.style.pointerEvents = pointerEvents;
  });
};

export const hideModalAndOverlay = function (
  overlayEl,
  modalEl,
  bulkBtnEl,
  menuIconEl,
) {
  overlayEl.classList.add("hide");
  modalEl.classList.add("hide");
  removeModalEffect(bulkBtnEl, 0, "hidden", "none");
  menuIconEl.classList.remove("hide");
};
