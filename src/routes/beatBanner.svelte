<!-- https://ryanmulligan.dev/blog/css-marquee/ -->
<!-- Marquee technique -->

<!-- layer opposite gradient on top with different patttern -->
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
    window.requestAnimationFrame(textAnimStep);
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
  let sixteenthLoop = (60000.0 / tempo) * 8;
  $: sixteenthLoop = (60000.0 / tempo) * 8;
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
      currentSpan.style.transform = `translateX(calc(-${100*normTime}% - var(--gap)))`; 
      nextSpan.style.transform = `translateX(calc(-${100*normTime}% - var(--gap)))`; 
      //nextSpan.style.transform = `${100*(1-normTime)}%`; 
      //nextSpan.style.transform = `translateX(1rem)`; 
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
<section>
  {#if seqPat}
    <p class="beat1">
      <!-- {#each seqPat[0].pattern as beatStep, i}
        <span id="c1{i}">{beatStep}</span>
      {/each} -->
      <!-- <span>1</span>
      <span>0</span>
      <span>1</span>
      <span>1</span>
      <span>0</span>
      <span>1</span>
      <span>1</span>
      <span>0</span>
      <span>1</span>
      <span>1</span>
      <span>0</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>0</span> -->
    </p>    
    <!-- <p class="beat2">
      {#each seqPat[1].pattern as beatStep, i}
        <span id="c2{i}">{beatStep}</span>
      {/each}
    </p>    
    <p class="beat3">
      {#each seqPat[2].pattern as beatStep, i}
        <span id="c3{i}">{beatStep}</span>
      {/each}
    </p>  -->   

  {/if}  
  <!-- <table>
    <tr>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>*</td>
      <td>1</td>
      <td>1</td>
      <td>#</td>
      <td>1</td>
      <td>1</td>
      <td>#</td>
      <td>Œ</td>
      <td>1</td>
      <td>1</td>
      <td>¤</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </table>
  <table class="beat2">
    <tr>
      <td>*</td>
      <td>1</td>
      <td>1</td>
      <td>Ø</td>
      <td>¤</td>
      <td>1</td>
      <td>1</td>
      <td>#</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>Œ</td>
      <td>1</td>
      <td>Ø</td>
      
    </tr>
  </table> -->
  <ul bind:this={currentSpan}>
    <li>*</li>
    <li>1</li>
    <li>1</li>
    <li>Ø</li>
    <li>¤</li>
    <li>1</li>
    <li>1</li>
    <li>#</li>
    <li>0</li>
    <li>1</li>
    <li>1</li>
    <li>0</li>
    <li>0</li>
    <li>Œ</li>
    <li>1</li>
    <li>Ø</li>
  </ul>
  <ul bind:this={nextSpan} aria-hidden="true">
    <li>*</li>
    <li>1</li>
    <li>1</li>
    <li>Ø</li>
    <li>¤</li>
    <li>1</li>
    <li>1</li>
    <li>#</li>
    <li>0</li>
    <li>1</li>
    <li>1</li>
    <li>0</li>
    <li>0</li>
    <li>Œ</li>
    <li>1</li>
    <li>Ø</li>
  </ul>
</section>

<style>
  /* section {
    font-family: 'Pillowlava';
    font-weight: 600;
    font-size: 3vw;
    position: relative;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }
  table {
    width: 100%;
    text-align: center;
  }
  td {
    width: 6.25%;
  }
  td:hover {background-color: coral;}
  span {
    white-space: break-spaces;
  }
  p {
    display: flex;
    justify-content: space-between;
  }
  .beat1{
    font-weight: 1000;
  }
  .beat2{
    position: absolute;
    top:0%;
    left: 0%;
    font-weight: 400;
    color: blueviolet;
  }
  .beat3{
    position: absolute;
    top:0%;
    left: 0%;
    font-weight: 10;
    color: rgb(43, 226, 113);
  } */
  section {
    font-family: 'Pillowlava';
    font-weight: 600;
    font-size: 3vw;
    --gap: 1rem;
    position: relative;
    display: flex;
    overflow: hidden;
    /* user-select: none */;
    gap: var(--gap);
    background-image: -moz-linear-gradient(180deg, black, white, black)
  }
  ul {
    list-style: none;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    gap: var(--gap);
    min-width: 100%;
    /* animation: scroll 10s linear infinite; */
    padding: 0%;
  }
  li {
    text-align: center;
    width: 6.25%
  }
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }
</style>
