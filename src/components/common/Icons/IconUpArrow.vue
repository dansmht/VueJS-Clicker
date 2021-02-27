<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="14.5337"
      width="1.03812"
      height="30"
      :fill="color"
    />
    <rect
      width="1.01924"
      height="20.4557"
      transform="matrix(0.720205 -0.693761 0.720205 0.693761 14.5337 0.707092)"
      :fill="color"
    />
    <rect
      width="1.01924"
      height="20.4557"
      transform="matrix(-0.720205 -0.693761 -0.720205 0.693761 15.4663 0.707092)"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconUpArrow',
  props: {
    color: {
      type: String,
      default: '#FAFAFA',
    },
  },
};
</script>
