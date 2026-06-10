import { createRouter, createWebHistory } from 'vue-router';
import FallBack from '@/components/FallBack.vue';
import authRoutes from '@/modules/auth/AuthRoutes';
const routes = [
...authRoutes,

{
    path: '/:pathMatch(.*)*',
    name: 'FallBack',
    component: FallBack
}

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;