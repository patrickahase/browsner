let audioCtx, amp;
let tempo = 120.0;
// subdivisions per beat
let barDivider = 4;

let currentPatternNote = 0;
let pattern = [ 1, 1, 0, 1, 1, 0, 1, 0, 0 ];

function audioInit() {
  audioCtx = new AudioContext();
  amp = new GainNode(audioCtx);
  amp.connect(audioCtx.destination);
  triggerBeat();
}

function triggerBeat(){
  if(pattern[currentPatternNote] > 0){
    let newBeatCharacter = document.createElement('p');
    newBeatCharacter.classList.add("beat-character");
    newBeatCharacter.textContent = "@";
    newBeatCharacter.addEventListener("animationend", () => {
      //console.log("end");
      newBeatCharacter.remove();
    });
    document.getElementById("bannerSection").appendChild(newBeatCharacter);
    playNote(240.0, audioCtx.currentTime, 0.1);
  }
  currentPatternNote ++;
  if(currentPatternNote === pattern.length){ currentPatternNote = 0; }
  // trigger next beat
  setTimeout(triggerBeat, 60000/(tempo*barDivider));
}

//
function playNote(freq, time, length){
  osc1 = new OscillatorNode(audioCtx, {
    type: 'sine',
    frequency: freq
  });
  osc1.connect(amp);
  osc1.start(time);
  osc1.stop(time + length);
}