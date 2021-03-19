<template>
  <div
    id="app"
    @contextmenu.prevent
  >
    <the-loader v-if="loading || !loaded" />
    <main-layout
      v-if="loading || loaded"
      @loaded="setLoaded"
    />
  </div>
</template>

<script>
import MainLayout from '@/views/MainLayout.vue';
import TheLoader from '@/components/TheLoader.vue';

import 'vue-toastification/dist/index.css';
import '@/assets/scss/style.scss';

export default {
  components: { TheLoader, MainLayout },
  data() {
    return {
      loading: false,
      loaded: false,
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1800);
  },
  methods: {
    setLoaded() {
      this.loaded = true;
    },
  },
};
</script>
