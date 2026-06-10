import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import pinia from '@/plugins/pinia';
import vuetify from '@/plugins/vuetify'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(Vue3Toastify, {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    position: 'top-right',
});
app.mount('#app');