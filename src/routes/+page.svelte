<script>
    import BeatBanner from "./beatBanner.svelte";
    import Modal from "./modal.svelte";
    import Sequencer from "./sequencer.svelte";

    import * as pattern from "./pattern.json";

    // set up audioContext
    let audioCtx;
    // MODAL
    let showModal = true;
    // when dialog is closed
    $: showModal = showModal;
    export let seqTest;
    $: if(!showModal && !audioCtx){
      audioCtx = new AudioContext();
      console.log(pattern)
    }
    export let playNote;
    //test siblings functions
    /* function seqTest(){
    console.log("test");
    }; */
    
</script>
<Modal bind:showModal seqTest={seqTest}>

</Modal>
<BeatBanner bind:audioCtx bind:playNote={playNote} />
<Sequencer bind:seqTest={seqTest} audioCtx={audioCtx} playNote={playNote} />
