<template>
  <div class="shop-block">
    <div class="scroll-wrapper">
      <ul class="shop-list">
        <li
          v-if="inactiveSapphires"
          class="reincarnate-button"
          :class="{ready: reincarnationTimer <= 0}"
          @click="reincarnate"
        >
          Reincarnate (you will receive {{ inactiveSapphires }} material sapphires)
          <span v-if="reincarnationTimer > 0">{{ reincarnationTimeLeft }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { msToTime } from '@/shared/functions/timers';

export default {
  name: 'ShopBlock',
  props: {
    sapphires: {
      type: Number,
      required: true,
    },
    inactiveSapphires: {
      type: Number,
      required: true,
    },
    reincarnationTimer: {
      type: Number,
      required: true,
    },
  },
  computed: {
    reincarnationTimeLeft() {
      return msToTime(this.reincarnationTimer);
    },
  },
  methods: {
    reincarnate() {
      if (this.reincarnationTimer <= 0 && window.confirm('Do you want to reincarnate?')) {
        this.$emit('reincarnate');
      }
    },
  },
};
</script>
