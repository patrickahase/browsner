let audioCtx, amp, phaser;

function audioInit() {
  audioCtx = new AudioContext();
  startDrone();
}

function startDrone(){
  let osc1 = new OscillatorNode(audioCtx, {
    type: 'sawtooth',
    frequency: 90.0
  });
  let osc2 = new OscillatorNode(audioCtx, {
    type: 'sawtooth',
    frequency: 90.0
  });
  let lfo = new OscillatorNode(audioCtx, {
    type: 'sine',
    frequency: 0.01
  });
  let delay = audioCtx.createDelay();
  amp1 = new GainNode(audioCtx);
  amp2 = new GainNode(audioCtx);
  amp1.gain.value = 0.3;
  amp2.gain.value = 0.3;
  let lfoAmp = new GainNode(audioCtx);
  lfoAmp.gain.value = 0.001;
  //lfo.connect(lfoAmp).connect(phaser.frequency);
  //lfo.connect(osc1.detune);
  lfo.start();
  lfo.connect(lfoAmp).connect(delay.delayTime);
  osc1.start();
  osc2.start();
  osc1.connect(amp1).connect(delay).connect(audioCtx.destination);
  osc2.connect(amp2).connect(audioCtx.destination);
}

function startPhaserDrone(){
  let osc1 = new OscillatorNode(audioCtx, {
    type: 'sawtooth',
    frequency: 90.0
  });
  let osc2 = new OscillatorNode(audioCtx, {
    type: 'sawtooth',
    frequency: 90.0
  });
  let lfo = new OscillatorNode(audioCtx, {
    type: 'sine',
    frequency: 0.1
  });
  amp = new GainNode(audioCtx);
  amp.gain.value = 0.3;
  phaser = new BiquadFilterNode(audioCtx);
  phaser.type = "allpass";
  phaser.frequency.value = 600.0;
  phaser.Q.value = 0.1;
  let lfoAmp = new GainNode(audioCtx);
  lfoAmp.gain.value = 2000;
  lfo.connect(lfoAmp).connect(phaser.frequency);
  lfo.connect(osc1.detune);
  lfo.start();
  osc1.start();
  osc2.start();
  osc1.connect(amp).connect(phaser).connect(audioCtx.destination);
  osc2.connect(amp).connect(audioCtx.destination);
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

console.log(window.navigator.hardwareConcurrency);
console.log(window.navigator.userAgent);

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const domContentLoadedTime =
      entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
    console.log(
      `${entry.name}: DOMContentLoaded processing time: ${domContentLoadedTime}ms`
    );
  });
});

observer.observe({ type: "navigation", buffered: true });
