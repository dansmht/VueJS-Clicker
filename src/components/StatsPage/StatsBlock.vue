<template>
  <div class="stats-block">
    <span class="stats-title">
      {{ title }}
    </span>
    <span class="stats-value">
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'StatsBlock',
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
