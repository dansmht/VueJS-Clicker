import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './list';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
});

routes.forEach((route) => {
  router.addRoute({
    name: route.name,
    path: route.path,
    component: route.component,
  });
});

router.addRoute('*', {
  path: '*',
  redirect: '/',
});

export default router;
