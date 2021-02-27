<template>
  <div class="purchase-menu">
    <div class="title">
      Purchase
    </div>
    <ul class="list">
      <li
        v-for="item in items"
        :key="item.text"
        class="list-item"
        :class="{active: purchaseCount === item.value}"
        @click.left="onClickHandler(item.value)"
        @click.right="onClickHandler(item.value)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PurchaseMenu',
  props: {
    purchaseCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    items: {
      get() {
        return [{
          text: '1x',
          value: 1,
        }, {
          text: '5x',
          value: 5,
        }, {
          text: '10x',
          value: 10,
        }, {
          text: 'max',
          value: 0,
        }];
      },
    },
  },
  methods: {
    onClickHandler(value) {
      this.$emit('changePurchaseCount', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.purchase-menu {
  width: calc(var(--options-block-width) - 20px);
  height: 40px;
  background: var(--darkest-color);
  display: flex;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 107px;
  }

  .list {
    display: flex;

    .list-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc((var(--options-block-width) - 20px - 107px) / 4);
      color: var(--font-sub-color);

      &:hover {
        color: var(--font-main-color);
      }

      &.active {
        background: var(--darker-color);
        color: var(--font-main-color);
      }
    }
  }
}
</style>
