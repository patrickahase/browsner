let audioCtx;
let tempo = 120.0;
// subdivisions per beat
let barDivider = 4;

function audioInit() {
  audioCtx = new AudioContext();
  triggerBeat();
}

function triggerBeat(){
  let newBeatCharacter = document.createElement('p');
  newBeatCharacter.classList.add("beat-character");
  newBeatCharacter.textContent = "@";
  newBeatCharacter.addEventListener("animationend", () => {
    //console.log("end");
    newBeatCharacter.remove();
  });
  document.getElementById("bannerSection").appendChild(newBeatCharacter);
  // trigger next beat
  setTimeout(triggerBeat, 60000/(tempo*barDivider));
}

//
function PlayNote(){
  console.log();
}