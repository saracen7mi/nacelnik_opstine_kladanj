// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBcPS1ja3fd5v--aY2JwO2idtoAvle5B80",
  authDomain: "edissaric-d52be.firebaseapp.com",
   databaseURL:"https://edissaric-d52be-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "edissaric-d52be",
  storageBucket: "edissaric-d52be.firebasestorage.app",
  messagingSenderId: "992632415911",
  appId: "1:992632415911:web:99d8ead4ccac04996fdd82",
  measurementId: "G-J1G23C7VYV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn.glitch.global/71d32274-77c7-41ec-9552-8c3870f9b0e1/Webp.net-resizeimage%20(3).png?v=1739614111283',
         badge:'https://cdn.glitch.global/71d32274-77c7-41ec-9552-8c3870f9b0e1/Webp.net-resizeimage%20(3).png?v=1739614111283'
    };

    // Prikaz obavijesti
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Event listener za klik na obavijest
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                // Ovde proverite da li je URL pravilno naveden
                if (client.url === 'https://kladanj.ba' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otvori novi prozor ako nema otvorenog sa istim URL-om
            return clients.openWindow('https://kladanj.ba');
        })
    );
});