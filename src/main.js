import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './app/router';
import './style.css';
import telegram from './services/telegram';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize Telegram WebApp
telegram.ready();
telegram.expand();

// Apply Telegram theme colors to document
document.documentElement.style.setProperty('--tg-theme-bg-color', telegram.themeParams.bg_color || '#ffffff');
document.documentElement.style.setProperty('--tg-theme-text-color', telegram.themeParams.text_color || '#000000');
document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', telegram.themeParams.secondary_bg_color || '#efeff3');
document.documentElement.style.setProperty('--tg-theme-button-color', telegram.themeParams.button_color || '#2481cc');
document.documentElement.style.setProperty('--tg-theme-button-text-color', telegram.themeParams.button_text_color || '#ffffff');

app.mount('#app');
