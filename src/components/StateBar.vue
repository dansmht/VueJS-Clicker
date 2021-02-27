<template>
  <div class="state-bar">
    <div class="container">
      <div class="gold">
        <span v-tooltip="formattedGold">Gold: {{ abbreviatedGold }}</span>
      </div>
      <div class="diamonds">
        Diamonds:
      </div>
    </div>
  </div>
</template>

<script>
import { abbreviateNumber } from '@/utils/abbreviateNumber';

export default {
  name: 'StateBar',
  props: {
    gold: {
      type: Number,
      required: true,
    },
  },
  computed: {
    abbreviatedGold() {
      return abbreviateNumber(this.gold);
    },
    formattedGold() {
      return this.gold.toLocaleString('ru-RU');
    },
  },
};
</script>

<style lang="scss" scoped>
.state-bar {
  height: 40px;
  background: var(--darkest-color);

  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .gold {
      width: var(--options-block-width);
    }

    .diamonds {
      width: var(--monster-block-width);
    }
  }
}
</style>
