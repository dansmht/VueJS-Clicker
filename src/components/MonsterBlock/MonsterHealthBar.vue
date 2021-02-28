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

<style lang="scss" scoped>
@for $i from 0 through 100 {
  .progress progress[value="#{$i}"] {
    & ~ .progress-bg .progress-bar { width: $i * 1% }
  }
}

.progress {
  width: 100%;
  height: 6px;

  progress {
    display: none;
  }

  .progress-bg {
    background: var(--darker-color);
    position: relative;
    height: 100%;

    .progress-bar {
      background: var(--font-main-color);
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      transition: width .5s linear;
    }
  }
}
</style>
