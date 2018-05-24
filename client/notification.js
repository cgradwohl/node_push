const public_vapid_key = 'BOu7vP_sncGSLzigVgTH1XeQ6KBQb5kK24jLoB00E0VliEOWSJZDi5MvAiQxt9V68g5RjTlB3GhPOJpkP-G11es';

// check if service worker is compatible with browser
if('serviceWorker' in navigator){
    /**
     * navigator is a window object that works 
     * in tandom with service workers.
     */
    // console.log('navigator', navigator);
    subscribeToNotification()
        .catch(err => console.err(err));
}

async function subscribeToNotification() {
    
    // register service worker and defines a global scope 
    const register = await navigator.serviceWorker
        .register('/service-worker.js', {
        scope: '/'
    });

    // sets up a subscription to the registered service workers push manager
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(public_vapid_key)
    });

    // POST to backend which will send back the notification.
    await fetch('/notification', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

}

/**
 * When using your VAPID key in your web app, you'll need to 
 * convert the URL safe base64 string to a Uint8Array to pass 
 * into the subscribe call.
 */
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