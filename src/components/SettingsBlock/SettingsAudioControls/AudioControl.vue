<template>
  <li v-on="$listeners">
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
  },
};
</script>
