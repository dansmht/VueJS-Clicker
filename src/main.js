import Vue from 'vue';
import VTooltip from 'v-tooltip';
import store from './store';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VTooltip);
VTooltip.options.defaultPlacement = 'bottom';
VTooltip.options.defaultOffset = 8;
VTooltip.options.defaultDelay = { show: 500, hide: 100 };

new Vue({
  data: { store },
  router,
  render: (h) => h(App),
}).$mount('#app');
