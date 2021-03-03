<template>
  <div class="update-page">
    <div class="scroll-wrapper">
      <ul class="list">
        <upgrade-card
          v-for="upgrade in upgradesToShow"
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
  computed: {
    upgradesToShow() {
      return this.upgrades.filter((upgrade) => upgrade.show);
    },
    lastUpgradeToShow() {
      return this.upgradesToShow[this.upgradesToShow.length - 1];
    },
  },
  watch: {
    gold(val) {
      if (this.upgrades.length > this.upgradesToShow.length && val >= this.lastUpgradeToShow.cost) {
        const nextUpgradeToShowId = this.upgrades[this.upgradesToShow.length].id;
        this.$emit('unlockUpgrade', nextUpgradeToShowId);
      }
    },
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
