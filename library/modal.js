/* find reference to dialog HTML element by referencing id */
let modal = document.getElementById("welcomeModal");
/* open modal on load */
modal.showModal();
/* find reference to modal button HTML element by referencing id */
let startButton = document.getElementById("startButton");
/* when clicked start audio and close modal */
startButton.addEventListener("click", () => {
  audioInit();
  modal.close();
});
