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
    {{ monsterIndex }}
  </div>
</template>

<script>
import BaseMonster from '@/components/MonsterBlock/Monsters/BaseMonster.vue';
import MonsterParams from '@/components/MonsterBlock/MonsterParams.vue';
import SkillsArea from '@/components/MonsterBlock/SkillsArea.vue';
import { calcMonsterHP } from '@/shared/functions/formulas';
import { getRandomAnotherIndex } from '@/shared/functions/getRandom';

export default {
  name: 'MonsterBlock',
  components: { SkillsArea, MonsterParams, BaseMonster },
  props: {
    monsterIndex: {
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
      return !(this.monsterIndex % 50);
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
      console.log('currentHealthPoints', val);
      if (val <= 0) {
        console.log('killMonster');
        this.$emit('killMonster', this.isBoss);
      }
    },
    monsterIndex() {
      this.generateMonster();
    },
  },
  created() {
    this.generateMonster();

    setInterval(() => {
      this.hitMonster(false);
    }, 1000);
  },
  methods: {
    generateMonster() {
      this.rndMonster();
      this.calcMonsterStats();
    },
    hitMonster(isByClick) {
      const damage = isByClick
        ? this.damage
        : this.damagePerSec;

      const realDamage = this.currentHealthPoints > damage
        ? damage
        : this.currentHealthPoints;

      this.currentHealthPoints -= realDamage;
      this.$emit('hitMonster', realDamage, isByClick);
    },
    calcMonsterStats() {
      const hp = calcMonsterHP(this.monsterIndex, this.isBoss);
      this.maxHealthPoints = hp;
      this.currentHealthPoints = hp;
    },
    rndMonster() {
      if (this.isBoss) {
        this.lastBossIdx = this.getMonsterIndex(this.bosses.length, this.lastBossIdx);
        this.setMonster(this.bosses, this.lastBossIdx);
      } else {
        this.lastMonsterIdx = this.getMonsterIndex(this.monsters.length, this.lastMonsterIdx);
        this.setMonster(this.monsters, this.lastMonsterIdx);
      }
    },
    getMonsterIndex(length, prevIndex) {
      return getRandomAnotherIndex(prevIndex, length - 1);
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
