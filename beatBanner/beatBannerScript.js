let audioCtx;
let tempo = 120.0;
// subdivisions per beat
let barDivider = 4;

function audioInit() {
  audioCtx = new AudioContext();
  triggerBeat();
}

function triggerBeat(){
  console.log("beat");
  setTimeout(triggerBeat, 60000/(tempo*barDivider));
}

//
function PlayNote(){
  console.log();
}