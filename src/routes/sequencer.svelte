<script>
  import Patterns from "./patterns.svelte";

  export let seqPat;
  export let playNote;
  /* Adapted from https://github.com/cwilso/metronome/blob/main/js/metronome.js */
  /* See https://web.dev/audio-scheduling/ for reference */
  export let audioCtx;
  $: if(audioCtx){ play(); handleResize(); } // run when audio init
  let isPlaying = false; // playback state
  let startTime; // beginning of sequence
  let current16thNote; // last scheduled note ! change freq and name
  let tempo = 160.0; // bpm
  let lookahead = 25.0; //(ms) calliung schedule freq
  let scheduleAheadTime = 0.1; //(s) how far ahead to schedule
  let nextNoteTime = 0.0; // when the next note is due.
  let noteResolution = 0; // 0 == 16th, 1 == 8th, 2 == quarter note
  let noteLength = 0.05; // length of "beep" (in seconds)
  let notesInQueue = []; // the notes that have been put into the web audio,
                         // and may or may not have played yet. {note, time}
  let timerID; // timing interval

  function nextNote(){
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
    current16thNote++;    // Advance the beat number, wrap to zero
    if (current16thNote == 16) { current16thNote = 0; }
  }

  
  function scheduleNote( beatNumber, time ) {
      // push the note on the queue, even if we're not playing.
      notesInQueue.push( { note: beatNumber, time: time } );

      if ( (noteResolution==1) && (beatNumber%2))
          return; // we're not playing non-8th 16th notes
      if ( (noteResolution==2) && (beatNumber%4))
          return; // we're not playing non-quarter 8th notes

      // create an oscillator
      

      // run through defined voices and play any needed notes
      /* seqPat.forEach(oscVoice => {
        
      }); */
      if(seqPat[0].pattern[beatNumber]){playNote(240, time, noteLength);}
  }

  function scheduler() {
      // while there are notes that will need to play before the next interval, 
      // schedule them and advance the pointer.
      while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
          scheduleNote( current16thNote, nextNoteTime );
          nextNote();
      }
      timerID = setTimeout(scheduler, lookahead);
      
  }

  function play() {
    isPlaying = !isPlaying;

    current16thNote = 0;
    nextNoteTime = audioCtx.currentTime;
    scheduler(); // kick off scheduling
    
  }

  function handleResize(){
    let widthPercent = window.innerWidth / screen.width;
    /* while(width >  160){*/
    /*   width /= 2; */
    /* } */
    /* tempo = width; */
    tempo = 160 - remapRange(widthPercent, 0, 1, 0, 70);
  }

  function remapRange(input, low1, high1, low2, high2){
    return low2 + (high2 - low2) * (input - low1) / (high1 - low1);
  }
    
</script>

<Patterns bind:seqPat={seqPat}/>

<svelte:window on:resize={handleResize} />