<script>
  import MetronomeWorker from './metronomeworker.js?worker';
  export let playNote;
  /* Adapted from https://github.com/cwilso/metronome/blob/main/js/metronome.js */
  /* See https://web.dev/audio-scheduling/ for reference */
  export let audioCtx;
  $: if(audioCtx){ init() } // run when audio init
  let isPlaying = false; // playback state
  let startTime; // beginning of sequence
  let current16thNote; // last scheduled note ! change freq and name
  let tempo = 120.0; // bpm
  let lookahead = 25.0; //(ms) calliung schedule freq
  let scheduleAheadTime = 0.1; //(s) how far ahead to schedule
  let nextNoteTime = 0.0; // when the next note is due.
  let noteResolution = 0; // 0 == 16th, 1 == 8th, 2 == quarter note
  let noteLength = 0.05; // length of "beep" (in seconds)
  let notesInQueue = []; // the notes that have been put into the web audio,
                         // and may or may not have played yet. {note, time}
  let timerWorker = null; // The Web Worker used to fire timer messages

  function nextNote(){
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
    current16thNote++;    // Advance the beat number, wrap to zero
    if (current16thNote == 16) { current16thNote = 0; }
  }

  
  function scheduleNote( beatNumber, time, osc ) {
      // push the note on the queue, even if we're not playing.
      notesInQueue.push( { note: beatNumber, time: time } );

      if ( (noteResolution==1) && (beatNumber%2))
          return; // we're not playing non-8th 16th notes
      if ( (noteResolution==2) && (beatNumber%4))
          return; // we're not playing non-quarter 8th notes

      // create an oscillator
      playNote(240, time, noteLength);
  }

  function scheduler() {
      // while there are notes that will need to play before the next interval, 
      // schedule them and advance the pointer.
      while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
          scheduleNote( current16thNote, nextNoteTime );
          nextNote();
      }
  }

  function play() {
    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
        current16thNote = 0;
        nextNoteTime = audioCtx.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");
        return "play";
    }
  }

  function init(){
    timerWorker = new MetronomeWorker();
    timerWorker.onmessage = function(e) {
        if (e.data == "tick") {
            console.log("tick!");
            scheduler();
        }
        else
            console.log("message: " + e.data);
    };
    timerWorker.postMessage({"interval":lookahead});
  }

  
</script>