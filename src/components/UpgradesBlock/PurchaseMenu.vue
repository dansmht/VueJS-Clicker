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
        @click="onClickHandler(item.value)"
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
