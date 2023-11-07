let modal = document.getElementById("welcomeModal");
// open on load
modal.showModal();
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  // from audioContext.js - starts the audio system
  audioInit();
  modal.close();
});
