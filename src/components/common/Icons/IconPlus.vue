<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="30"
      y="14"
      width="1"
      height="30"
      transform="rotate(90 30 14)"
      :fill="color"
    />
    <rect
      x="14"
      width="1"
      height="30"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconPlus',
  props: {
    color: {
      type: String,
      default: '#FAFAFA',
    },
  },
};
</script>
