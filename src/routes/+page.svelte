<script>
    import BeatBanner from "./beatBanner.svelte";
    import Modal from "./modal.svelte";

    // set up audioContext
    let audioCtx;
    const audioCtxInit = () => {audioCtx = new AudioContext}
    // MODAL
    let showModal = true;
    // when dialog is closed
    $: showModal = showModal;
</script>
<Modal bind:showModal>

</Modal>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<BeatBanner/>
