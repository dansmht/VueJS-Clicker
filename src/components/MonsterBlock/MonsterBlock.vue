<template>
  <div class="monster-block">
    <base-monster
      :component-name="componentName"
      @hitMonster="hitMonster"
    />
    <monster-params
      :name="name"
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
import { getRandomAnotherIndex } from '@/utils/getRandom';

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
      name: 'Rat',
      componentName: 'rat-monster',
      lastMonsterIdx: -1,
      lastBossIdx: -1,
    };
  },
  computed: {
    isBoss() {
      return !(this.currentMonsterIndex % 10);
    },
    monsters: {
      get() {
        return [{
          name: 'Rat',
          componentName: 'rat-monster',
        }, {
          name: 'Spider',
          componentName: 'spider-monster',
        }, {
          name: 'Ebony Statue',
          componentName: 'ebony-statue-monster',
        }];
      },
    },
    bosses: {
      get() {
        return [{
          name: 'Rat King',
          componentName: 'rat-king-monster',
        }, {
          name: 'Void Specter',
          componentName: 'void-specter-monster',
        }];
      },
    },
  },
  watch: {
    currentHealthPoints(val) {
      if (val <= 0) {
        this.$emit('nextMonster');
        this.$emit('enrollGold', calcGoldToEnroll(this.currentMonsterIndex));
        this.$emit('killMonster', this.isBoss);
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
      if (this.isBoss) {
        const { length } = this.bosses;
        this.lastBossIdx = getRandomAnotherIndex(this.lastBossIdx, length - 1);

        this.setMonster(this.bosses, this.lastBossIdx);
      } else {
        const { length } = this.monsters;
        this.lastMonsterIdx = getRandomAnotherIndex(this.lastMonsterIdx, length - 1);

        this.setMonster(this.monsters, this.lastMonsterIdx);
      }
    },
    setMonster(arr, idx) {
      this.componentName = arr[idx].componentName;
      this.name = arr[idx].name;
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
