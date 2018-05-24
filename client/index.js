const public_vapid_key = 'BOu7vP_sncGSLzigVgTH1XeQ6KBQb5kK24jLoB00E0VliEOWSJZDi5MvAiQxt9V68g5RjTlB3GhPOJpkP-G11es';

// check if service worker is compatible with browser
if('serviceWorker' in navigator){
    console.log('navigator', navigator);
    send()
        .catch(err => console.err(err));
}


// register service worker, push, and finally send 
async function send() {
    
    const register = await navigator.serviceWorker
        .register('/service-worker.js', {
        scope: '/'// defines scope of the service worker
    });


    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(public_vapid_key)
    });


    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }