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

telegram.ready();
telegram.expand();

// Apply Telegram theme
const tp = telegram.themeParams;
const root = document.documentElement.style;
root.setProperty('--tg-bg', tp.bg_color || '#ffffff');
root.setProperty('--tg-text', tp.text_color || '#1a1a1a');
root.setProperty('--tg-hint', tp.hint_color || '#8e8e93');
root.setProperty('--tg-link', tp.link_color || '#007aff');
root.setProperty('--tg-btn', tp.button_color || '#007aff');
root.setProperty('--tg-btn-text', tp.button_text_color || '#ffffff');
root.setProperty('--tg-secondary', tp.secondary_bg_color || '#f2f2f7');

app.mount('#app');
