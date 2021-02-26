<template>
  <div class="monster-block">
    <base-monster
      :monster-name="monsterName"
      @hitMonster="hitMonster"
    />
    <monster-params
      :name="monsterName"
      :current-health-points="currentHealthPoints"
      :max-health-points="maxHealthPoints"
    />
    <skills-area />
    {{ currentMonsterIndex }}
  </div>
</template>

<script>
import BaseMonster from '@/components/MonsterBlock/Monsters/BaseMonster.vue';
import MonsterParams from '@/components/MonsterBlock/MonsterParams.vue';
import SkillsArea from '@/components/MonsterBlock/SkillsArea.vue';
import { calcGoldToEnroll } from '@/utils/formulas';
import { getRandomInRange } from '@/utils/getRandomInRange';

export default {
  name: 'MonsterBlock',
  components: { SkillsArea, MonsterParams, BaseMonster },
  props: {
    currentMonsterIndex: {
      type: Number,
      required: true,
    },
    damage: {
      type: Number,
      required: true,
    },
    damagePerSec: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentHealthPoints: 1,
      maxHealthPoints: 1,
      monsterName: 'Rat',
      monsterIdx: 0,
    };
  },
  computed: {
    monsters: {
      get() {
        return ['Rat', 'Spider'];
      },
    },
  },
  watch: {
    currentHealthPoints(val) {
      if (val <= 0) {
        this.$emit('nextMonster');
        this.$emit('enrollGold', calcGoldToEnroll(this.currentMonsterIndex));
      }
    },
    currentMonsterIndex(value) {
      this.rndMonster();
      this.calcMonsterStats(value);
    },
  },
  created() {
    this.rndMonster();
    this.calcMonsterStats(this.currentMonsterIndex);

    setInterval(() => {
      this.currentHealthPoints -= this.damagePerSec;
      this.$emit('hitMonster', this.damagePerSec, false);
    }, 1000);
  },
  methods: {
    hitMonster() {
      this.currentHealthPoints -= this.damage;
      this.$emit('hitMonster', this.damage, true);
    },
    calcMonsterStats() {
      const hp = Math.floor(Math.random() * 10) + 10;
      this.maxHealthPoints = hp;
      this.currentHealthPoints = hp;
    },
    rndMonster() {
      const { length } = this.monsters;
      let idx;
      do {
        idx = getRandomInRange(0, length - 1);
      } while (this.monsterIdx === idx);

      this.monsterIdx = idx;
      this.monsterName = this.monsters[idx];
    },
  },
};
</script>

<style lang="scss" scoped>
.monster-block {
  width: var(--monster-block-width);
  margin: 30px auto 0;
}
</style>
