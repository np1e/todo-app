import App from './App.vue';
import api from './api';
import router from './router';
import './index.css';
import { createApp } from 'vue';

createApp(App)
    .provide('api', api)
    .use(router)
    .mount('#app');
