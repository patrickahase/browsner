/* Current Signal Path */

/*

↓
globalVol | gain node
↓
audioCtx.destination
*/

/* initial declaration of variables - they'll all be null until audioInit is run */
let audioCtx, globalVol;

/* initial setup of the audio after user interaction */
/* webaudio can't automatically play on a page load so needs to happen after users do something on the page */
function audioInit(){
  /* this selects from two different implementations of audiocontext objects for different browsers */
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  /* create new audiocontext - this is the audio environment we attach everything to */
  /* we only ever need one audiocontext per tab */
  audioCtx = new AudioContext();
  /* create main volume control */
  globalVol = new GainNode(audioCtx);
  /* connect it to the audiocontext output */
  globalVol.connect(audioCtx.destination);
}