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
