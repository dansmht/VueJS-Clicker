<template>
  <div
    id="app"
    @contextmenu.prevent
  >
    <state-bar :gold="current.gold" />
    <the-nav />
    <main>
      <div class="container main-wrapper">
        <router-view
          :upgrades="upgrades"
          :gold="current.gold"
          :current="current"
          :total="total"
          @upgradeCard="upgradeCard"
          @unlockUpgrade="unlockUpgrade"
        />
        <monster-block
          :monster-index="current.monsterIndex"
          :damage="current.damage"
          :damage-per-sec="current.damagePerSec"
          @enrollGold="enrollGold"
          @hitMonster="hitMonster"
          @killMonster="killMonster"
        />
      </div>
    </main>
  </div>
</template>

<script>
import StateBar from '@/components/StateBar.vue';
import TheNav from '@/components/TheNav.vue';
import MonsterBlock from '@/components/MonsterBlock/MonsterBlock.vue';
import { calcGoldForKilling } from '@/shared/functions/formulas';
import { current, total, upgrades } from '@/shared/initialState/initialAppState';

import '@/assets/scss/style.scss';

export default {
  components: { MonsterBlock, TheNav, StateBar },
  data() {
    return {
      total,
      current,
      upgrades,
    };
  },
  beforeCreate() {
    // test for multitabs
    window.session = Math.random().toString();
    localStorage.setItem('session', window.session);
    const onStorage = (e) => {
      if (e.key === 'session' && e.newValue !== window.session) {
        localStorage.setItem('multitab', window.session);
      }
      if (e.key === 'multitab' && e.newValue && e.newValue !== window.session) {
        window.removeEventListener('storage', onStorage);
        localStorage.setItem('session', localStorage.getItem('multitab'));
        localStorage.removeItem('multitab');
        alert('Multitab');
        window.close();
      }
    };
    window.addEventListener('storage', onStorage);

    // second way
    // window.addEventListener('storage', () => {
    //   window.alert('another window or tab is working on the same localStorage');
    //   window.close();
    // }, false);
    //
    // localStorage.setItem('Sentinel', Math.random().toString());
  },
  methods: {
    nextMonster() {
      this.current.monsterIndex++;
    },
    enrollGold(gold) {
      this.current.gold += gold;
    },
    writeOffGold(gold) {
      this.current.gold -= gold;
    },
    upgradeCard({
      id,
      gold,
      levels,
      value,
    }) {
      this.writeOffGold(gold);
      const upgrade = this.upgrades.find((u) => u.id === id);
      upgrade.level += levels;
      this.total.purchasedLevels += levels;
      if (id === 1) {
        this.current.damage += value;
      } else {
        this.current.damagePerSec += value;
      }
    },
    hitMonster(damage, isByClick) {
      if (isByClick) {
        this.total.clicks++;
      }
      this.total.damage += damage;
    },
    killMonster(isBoss) {
      this.enrollGold(calcGoldForKilling(this.current.monsterIndex, isBoss));
      this.nextMonster();
      if (isBoss) {
        this.total.kills.bosses++;
      }
      this.total.kills.monsters++;
    },
    unlockUpgrade(id) {
      const upgrade = this.upgrades.find((u) => u.id === id);
      upgrade.show = true;
    },
  },
};
</script>
