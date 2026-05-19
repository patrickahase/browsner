const registerServiceWorker = async () => {
  // if service worker supported
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("../../library/serviceWorker.js", {
        scope: "/library/",
      });
      // if service worker is installing, waiting to install, or already active
      if (registration.installing || registration.waiting || registration.active) {
/*         console.log(navigator.serviceWorker); */
        registration.active.postMessage("init");
      }
      navigator.serviceWorker.addEventListener('message', e => {
        console.log(e.data);
        clientMessageDictionary["connections"](e);
        //
      });
      /* add tab closing msg */
      window.addEventListener('beforeunload', () =>{
        registration.active.postMessage("end");
      });
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  } else {
    // if service worker not supported
  }
};

registerServiceWorker();

const clientMessageDictionary = {
  /* on new tab connect */
  connections: function(e) {
    document.title = e.data.connections;
  }
}
