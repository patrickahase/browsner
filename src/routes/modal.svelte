<script>
  // time on intro modal defines something - swqig?
  // convolution based on user system - loadtime?
  // lain hum
  import { onMount } from "svelte";
  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  $: if(dialog && showModal) dialog.showModal();

  /* export let seqTest; */

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => {showModal=false; /* seqTest(); */}}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-autofocus -->
  <button autofocus on:click={() => dialog.close()}>close modal</button>
</dialog>

<style>

</style>