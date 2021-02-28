<template>
  <div class="update-page">
    <div class="scroll-wrapper">
      <ul class="list">
        <upgrade-card
          v-for="upgrade in upgrades"
          :key="upgrade.id"
          :idx="upgrade.id"
          :name="upgrade.name"
          :description="upgrade.description"
          :level="upgrade.level"
          :cost="upgrade.cost"
          :gold="gold"
          :purchase-count="purchaseCount"
          :growth-rate="upgrade.growthRate"
          @upgradeCard="upgradeCard"
        />
      </ul>
    </div>
    <purchase-menu
      :purchase-count="purchaseCount"
      @changePurchaseCount="onChangePurchaseCount"
    />
  </div>
</template>

<script>
import UpgradeCard from '@/components/UpgradesPage/UpgradeCard.vue';
import PurchaseMenu from '@/components/UpgradesPage/PurchaseMenu.vue';

export default {
  name: 'UpgradesPage',
  components: { PurchaseMenu, UpgradeCard },
  props: {
    upgrades: {
      type: Array,
      required: true,
    },
    gold: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      purchaseCount: 1,
    };
  },
  methods: {
    onChangePurchaseCount(val) {
      this.purchaseCount = val;
    },
    upgradeCard(payload) {
      this.$emit('upgradeCard', payload);
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
