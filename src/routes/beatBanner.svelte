<script>
  let stops = [0 , 1, 1, 0];
  let stopsPercDiv = 100 / stops.length;
  
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
