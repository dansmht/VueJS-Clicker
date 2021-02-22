<template>
  <div class="update-page">
    <div class="scroll-wrapper">
      <ul class="list">
        <upgrade-card
          v-for="idx in 20"
          :key="idx"
          :idx="idx"
        />
      </ul>
    </div>
    <purchase-menu
      :purchase-multiplier="purchaseMultiplier"
      @changePurchaseMultiplier="onChangePurchaseMultiplier"
    />
  </div>
</template>

<script>
import UpgradeCard from '@/components/UpgradesPage/UpgradeCard.vue';
import PurchaseMenu from '@/components/UpgradesPage/PurchaseMenu.vue';

export default {
  name: 'UpgradesPage',
  components: { PurchaseMenu, UpgradeCard },
  data() {
    return {
      purchaseMultiplier: 1,
    };
  },
  methods: {
    onChangePurchaseMultiplier(val) {
      this.purchaseMultiplier = val;
      console.log('onChangePurchaseMultiplier', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.update-page {
  width: var(--options-block-width);
  height: calc(100vh - 120px);
  margin: 20px 10px 20px;

  .scroll-wrapper {
    height: calc(100% - 40px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: var(--darker-color);
    }

    &::-webkit-scrollbar-thumb {
      background: #727272;
    }
  }

  .list {
    margin-right: 16px;
  }
}
</style>
