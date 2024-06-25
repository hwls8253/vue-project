import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import '~/index.scss';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');

app.provide('isDesktop', document.documentElement.classList.contains('desktop'));
app.provide('isMobile', document.documentElement.classList.contains('mobile'));