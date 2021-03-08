<template>
  <div class="shop-block">
    <div class="scroll-wrapper">
      <ul class="shop-list">
        <li
          v-if="inactiveSapphires"
          class="reincarnate-button"
        >
          Reincarnate (you will receive {{ inactiveSapphires }} material sapphires)
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopBlock',
  props: {
    sapphires: {
      type: Number,
      required: true,
    },
    inactiveSapphires: {
      type: Number,
      required: true,
    },
  },
};
</script>
