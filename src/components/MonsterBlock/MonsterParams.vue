<template>
  <div class="monster-params">
    <h3 class="name">
      {{ name }}
    </h3>
    <div class="health-points">
      HP: {{ currHP }}/{{ maxHP }}
    </div>
    <monster-health-bar
      :current="currentHealthPoints"
      :max="maxHealthPoints"
    />
  </div>
</template>

<script>
import MonsterHealthBar from '@/components/MonsterBlock/MonsterHealthBar.vue';
import { abbreviateNumber } from '@/utils/abbreviateNumber';

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
  },
};
</script>

<style lang="scss" scoped>
.monster-params {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .name {
    font-size: var(--large-font);
    font-weight: normal;
    margin: 10px 0;
  }

  .health-points {
    font-size: var(--small-font);
    margin-bottom: 10px;
  }
}
</style>
