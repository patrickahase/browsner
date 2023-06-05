<script>
  import { onMount } from "svelte";
  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  $: if(dialog && showModal) dialog.showModal();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal=false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-autofocus -->
  <button autofocus on:click={() => dialog.close()}>close modal</button>
</dialog>

<style>

</style>