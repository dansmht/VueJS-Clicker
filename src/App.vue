<template>
  <div
    id="app"
    @contextmenu.prevent
  >
    <main-layout />
  </div>
</template>

<script>
import MainLayout from '@/views/MainLayout.vue';

import '@/assets/scss/style.scss';

export default {
  components: { MainLayout },
};
</script>
