import { createRouter, createWebHistory } from 'vue-router';
import test from '@/pages/router';

const routes = [
  {
    path: '/home/',
    name: 'Home',
    meta: {
      layout: 'main',
      wrapClass: [],
      containerClass: [],
    },
    component: () => import('@/pages/home.vue'),
  },
  ...test,
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});
export default router;
