import {createPinia} from 'pinia';
import router from '@/router';
import { toast } from 'vue3-toastify';
import {markRaw} from 'vue';
import AuthService from '@/modules/auth/AuthService';

const pinia = createPinia();
pinia.use(({store}) => {
    store.router = markRaw(router);
    store.toast = markRaw(toast);
    store.AuthService = markRaw(AuthService);
});

export default pinia;