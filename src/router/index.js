import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/views/MainLayout.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
});

router.addRoute({
  name: 'Main',
  path: '/',
  component: MainLayout,
});

router.addRoute({
  path: '*',
  redirect: '/',
});

export default router;
