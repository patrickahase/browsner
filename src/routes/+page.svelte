<script>
    import BeatBanner from "./beatBanner.svelte";
    import Modal from "./modal.svelte";
    import Sequencer from "./sequencer.svelte";
    import Patterns from "./patterns.svelte";
    export let seqPat;
    // set up audioContext
    let audioCtx;
    // MODAL
    let showModal = true;
    // when dialog is closed
    $: showModal = showModal;
    export let seqTest;
    $: if(!showModal && !audioCtx){
      audioCtx = new AudioContext();
      handleResize();
    }
    export let playNote;
    //test siblings functions
    /* function seqTest(){
    console.log("test");
    }; */
    let tempo = 120.0;
    function handleResize(){
      tempo = 117 + (window.innerWidth % 43);
    }
    
</script>

<Modal bind:showModal seqTest={seqTest}/>
<BeatBanner bind:audioCtx bind:playNote={playNote} tempo={tempo} seqPat={seqPat} />
<Sequencer bind:seqTest={seqTest} audioCtx={audioCtx} playNote={playNote} tempo={tempo} seqPat={seqPat} />
<Patterns bind:seqPat={seqPat}/>

<svelte:window on:resize={handleResize} />



