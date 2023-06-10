<script>

  let stops = [0 , 1, 1, 0];
  let stopsPercDiv = 100 / stops.length;
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
  
</script>

<svg
  viewBox="0 0 10 10"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="myGradient">
      {#each stops as stop, i}
        <stop offset="{i * stopsPercDiv}%" stop-color="blue" />
        <stop offset="{(i * stopsPercDiv) + 2.5}%" stop-color="red" />
        <stop offset="{(i * stopsPercDiv) + 22.5}%" stop-color="blue" />
      {/each}
    </linearGradient>
  </defs>

  <!-- using my linear gradient -->
  <rect width="10" height="10" fill="url('#myGradient')">
    <animate attributeName="x" values="0;-10;" dur="10s" repeatCount="indefinite"></animate>
  </rect>
  <rect x="10" width="10" height="10" fill="url('#myGradient')">
    <animate attributeName="x" values="10;0;" dur="10s" repeatCount="indefinite"></animate>
  </rect>
</svg>

<button on:click={playNote(audioCtx.currentTime)}>
  press
</button>
