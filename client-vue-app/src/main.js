import App from './App.vue';
import api from './api';
import router from './router';
import './index.css';
import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
    apiKey: process['env']._FIREBASE_API_KEY,
    authDomain: `${import.meta.env.VITE_GCLOUD_PROJECT}.firebaseapp.com`,
    projectId: process.env.VITE_GCLOUD_PROJECT,
    storageBucket: `${import.meta.env.VITE_GCLOUD_PROJECT}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_PROJECT_NUMBER,
    appId: "1:72095501801:web:d256ee1fd1eeff7f91cf78"
};

initializeApp(firebaseConfig);
const auth = getAuth();

if (import.meta.env.DEV) {
    connectAuthEmulator(auth, "http://localhost:9099");
}

createApp(App)
    .provide('api', api)
    .provide('auth', auth)
    .use(router)
    .mount('#app');
