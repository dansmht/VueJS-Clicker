<template>
  <div
    id="app"
    @contextmenu.prevent
  >
    <state-bar />
    <the-nav />
    <main>
      <div class="container main-wrapper">
        <router-view
          :upgrades="upgradesToShow"
          @upgradeCard="upgradeCard"
        />
        <monster-block
          @enrollGold="enrollGold"
          @hitMonster="hitMonster"
          @killMonster="killMonster"
        />
      </div>
    </main>
  </div>
</template>

<script>
import store from '@/store';
import StateBar from '@/components/StateBar.vue';
import TheNav from '@/components/TheNav.vue';
import MonsterBlock from '@/components/MonsterBlock/MonsterBlock.vue';
import { calcGoldForKilling } from '@/shared/functions/formulas';

import '@/assets/scss/style.scss';

export default {
  components: { MonsterBlock, TheNav, StateBar },
  computed: {
    upgradesToShow() {
      return store.upgrades.filter((upgrade) => upgrade.show);
    },
    lastUpgradeToShow() {
      return this.upgradesToShow[this.upgradesToShow.length - 1];
    },
  },
  watch: {
    '$root.store.current.gold': function (val) {
      console.log('watch gold');
      if (
        store.upgrades.length > this.upgradesToShow.length
        && val >= this.lastUpgradeToShow.cost
      ) {
        const nextUpgradeToShowId = store.upgrades[this.upgradesToShow.length].id;
        this.unlockUpgrade(nextUpgradeToShowId);
      }
    },
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
  mounted() {
    console.log(this, store);
  },
  methods: {
    nextMonster() {
      store.current.monsterIndex++;
    },
    enrollGold(gold) {
      store.current.gold += gold;
      store.total.gold += gold;
    },
    writeOffGold(gold) {
      store.current.gold -= gold;
    },
    upgradeCard({
      id,
      gold,
      levels,
      value,
    }) {
      this.writeOffGold(gold);
      const upgrade = store.upgrades.find((u) => u.id === id);
      upgrade.level += levels;
      store.total.purchasedLevels += levels;
      if (id === 1) {
        store.current.damage += value;
      } else {
        store.current.damagePerSec += value;
      }
    },
    hitMonster(damage, isByClick) {
      if (isByClick) {
        store.total.clicks++;
      }
      store.total.damage += damage;
    },
    killMonster(isBoss) {
      this.enrollGold(calcGoldForKilling(store.current.monsterIndex, isBoss));
      this.nextMonster();
      if (isBoss) {
        store.total.kills.bosses++;
      }
      store.total.kills.monsters++;
    },
    unlockUpgrade(id) {
      const upgrade = store.upgrades.find((u) => u.id === id);
      upgrade.show = true;
    },
  },
};
</script>
