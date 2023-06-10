<script>
    import BeatBanner from "./beatBanner.svelte";
    import Modal from "./modal.svelte";
    import Sequencer from "./sequencer.svelte";

    // set up audioContext
    let audioCtx;
    // MODAL
    let showModal = true;
    // when dialog is closed
    $: showModal = showModal;
    export let seqTest;
    $: if(!showModal && !audioCtx){
      audioCtx = new AudioContext();
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


