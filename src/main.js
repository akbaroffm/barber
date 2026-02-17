import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './app/router';
import './style.css';
import 'leaflet/dist/leaflet.css';
import telegram from './services/telegram';

const app = createApp(App);
app.use(createPinia());
app.use(router);

telegram.ready();
telegram.expand();

app.mount('#app');
