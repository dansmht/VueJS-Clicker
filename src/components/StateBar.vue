<template>
  <div class="state-bar">
    <div class="container">
      <div class="gold">
        <span
          v-tooltip="formattedGold"
          class="help"
        >
          Gold: {{ abbreviatedGold }}
        </span>
      </div>
      <div class="sapphires">
        Sapphires: {{ sapphires }}
        <span v-if="inactiveSapphires">(+{{ inactiveSapphires }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { abbreviateNumber } from '@/shared/functions/abbreviateNumber';
import { formatNum } from '@/shared/functions/formatNum';

export default {
  name: 'StateBar',
  props: {
    gold: {
      type: Number,
      required: true,
    },
    sapphires: {
      type: Number,
      required: true,
    },
    inactiveSapphires: {
      type: Number,
      required: true,
    },
  },
  computed: {
    abbreviatedGold() {
      return abbreviateNumber(this.gold);
    },
    formattedGold() {
      return formatNum(this.gold);
    },
  },
};
</script>
