<template>
  <div class="state-bar">
    <div class="container">
      <div class="gold">
        <span v-tooltip="formattedGold">
          Gold: {{ abbreviatedGold }}
        </span>
      </div>
      <div class="sapphires">
        Sapphires:
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
