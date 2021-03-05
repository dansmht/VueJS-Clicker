<template>
  <div class="upgrade-block">
    <div class="scroll-wrapper">
      <ul class="upgrade-list">
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
import UpgradeCard from '@/components/UpgradesBlock/UpgradeCard.vue';
import PurchaseMenu from '@/components/UpgradesBlock/PurchaseMenu.vue';

export default {
  name: 'UpgradesBlock',
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
