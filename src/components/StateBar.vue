<template>
  <div class="state-bar">
    <div class="container">
      <div class="gold">
        <span v-tooltip="formattedGold">
          Gold: {{ abbreviatedGold }}
        </span>
      </div>
      <div class="diamonds">
        Diamonds:
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { abbreviateNumber } from '@/shared/functions/abbreviateNumber';
import { formatNum } from '@/shared/functions/formatNum';

export default {
  name: 'StateBar',
  computed: {
    abbreviatedGold() {
      return abbreviateNumber(store.current.gold);
    },
    formattedGold() {
      return formatNum(store.current.gold);
    },
  },
};
</script>
