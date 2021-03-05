<template>
  <div class="stats-item">
    <span class="stats-title">
      {{ title }}
    </span>
    <span
      v-tooltip="`${value}`"
      class="stats-value"
    >
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'StatsItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>
