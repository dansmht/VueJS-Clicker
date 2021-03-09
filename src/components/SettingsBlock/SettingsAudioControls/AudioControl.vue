<template>
  <li
    v-tooltip="tooltipText"
    class="audio-control"
    v-on="$listeners"
  >
    <img
      :src="src"
      :alt="alt"
    >
  </li>
</template>

<script>
export default {
  name: 'AudioControl',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    tooltipText: {
      type: String,
      default: null,
    },
  },
};
</script>
