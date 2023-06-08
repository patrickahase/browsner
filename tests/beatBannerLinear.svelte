<script>
  export let seqPat;
  let currentSpan, nextSpan;
  export let audioCtx;
  let beatsInit = false;
  let osc1, amp1;
  $: if(audioCtx && !beatsInit){
    beatsInit = true;
    amp1 = new GainNode(audioCtx, {value: 1});
    let lfo = new OscillatorNode(audioCtx, {
      type: "square",
      frequency: 79,
    });
    lfo.connect(amp1.gain);
    lfo.start(0);
    amp1.connect(audioCtx.destination);
    /* window.requestAnimationFrame(textAnimStep); */
  }
  export function playNote(freq, time, length){
    osc1 = new OscillatorNode(audioCtx, {
      type: 'sine',
      frequency: freq
    });
    osc1.connect(amp1);
    osc1.start(time);
    osc1.stop(time + length);
  }
  // set up animation
  export let tempo;
  // get ms for a bar (4beats)
  let sixteenthLoop = (60000.0 / tempo) * 4;
  $: sixteenthLoop = (60000.0 / tempo) * 4;
  let start, previousTimeStamp, loopPoint;
  let done = false;
  // needs to work out time to end of loop based on tempo
  function textAnimStep(timeStamp){
    if (start === undefined){
      start = timeStamp;
      loopPoint = timeStamp;
    }
    const timeToGo = timeStamp - loopPoint;
    let normTime = timeToGo / sixteenthLoop;
    if(previousTimeStamp !== timeStamp){
      //animate
      currentSpan.style.left = `${-100*normTime}%`; 
      nextSpan.style.left = `${100*(1-normTime)}%`; 
    }
    if (timeToGo < sixteenthLoop) {
      // Stop the animation after 2 seconds
      previousTimeStamp = timeStamp;
      /*  */
      if (!done) {
        window.requestAnimationFrame(textAnimStep);
      }
    } else {
      start = timeStamp;
      loopPoint = timeStamp;
      window.requestAnimationFrame(textAnimStep);
    }
  }
</script>
<!-- ascii art character gradient  .:-=+*#%@ -->
<p>
  <span id="currentSpan" bind:this={currentSpan}>XX XX XX XX XXX </span><span id="nextSpan" bind:this={nextSpan}>XX XX XX XX XXX </span>
  
</p>

<style>
  p {
    font-family: 'BPdotsSquareVF';
    font-weight: 600;
    font-size: 10vw;
    position: relative;
    width: fit-content;
    margin: auto;
    overflow: hidden;
    
  }
  span {
    white-space: break-spaces;
  }
  #currentSpan{
    position: relative;
    left: 0%;
  }
  #nextSpan{
    position: absolute;
    left: 100%;
  }
</style>
