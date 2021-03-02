<template>
  <div class="progress">
    <progress
      max="100"
      :value="value"
    />
    <div class="progress-bg">
      <div class="progress-bar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonsterHealthBar',
  props: {
    max: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  computed: {
    value: {
      get() {
        return Math.floor((this.current / this.max) * 100);
      },
    },
  },
};
</script>
