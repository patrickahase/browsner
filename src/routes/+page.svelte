<script>
    import BeatBanner from "./beatBanner.svelte";
    import Modal from "./modal.svelte";

    // set up audioContext
    let audioCtx;
    // MODAL
    let showModal = true;
    // when dialog is closed
    $: showModal = showModal;
    $: if(!showModal && !audioCtx){
      audioCtx = new AudioContext();
    }
</script>
<Modal bind:showModal>

</Modal>
<BeatBanner bind:audioCtx/>
