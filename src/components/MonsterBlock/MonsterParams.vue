<template>
  <div class="monster-params">
    <h3 class="name">
      {{ name }}
    </h3>
    <div
      v-tooltip="`${formattedCurrHP} / ${formattedMaxHP}`"
      class="health-wrapper help"
    >
      <div class="health-points">
        HP: {{ currHP }}/{{ maxHP }}
      </div>
      <monster-health-bar
        :current="currentHealthPoints"
        :max="maxHealthPoints"
      />
    </div>
  </div>
</template>

<script>
import MonsterHealthBar from '@/components/MonsterBlock/MonsterHealthBar.vue';
import { abbreviateNumber } from '@/shared/functions/abbreviateNumber';
import { formatNum } from '@/shared/functions/formatNum';

export default {
  name: 'MonsterParams',
  components: { MonsterHealthBar },
  props: {
    name: {
      type: String,
      required: true,
    },
    currentHealthPoints: {
      type: Number,
      required: true,
    },
    maxHealthPoints: {
      type: Number,
      required: true,
    },
  },
  computed: {
    maxHP() {
      return abbreviateNumber(this.maxHealthPoints);
    },
    currHP() {
      return abbreviateNumber(this.currentHealthPoints);
    },
    formattedMaxHP() {
      return formatNum(this.maxHealthPoints);
    },
    formattedCurrHP() {
      return formatNum(this.currentHealthPoints);
    },
  },
};
</script>
