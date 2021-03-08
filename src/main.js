import Vue from 'vue';
import VTooltip from 'v-tooltip';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VTooltip);
VTooltip.options.defaultPlacement = 'bottom';
VTooltip.options.defaultOffset = 8;
VTooltip.options.defaultDelay = { show: 500, hide: 100 };

const toastOptions = {
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  closeButton: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.3,
  hideProgressBar: true,
  icon: false,
};
Vue.use(Toast, toastOptions);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
