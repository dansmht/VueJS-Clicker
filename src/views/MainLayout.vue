<template>
  <div class="vue-js-clicker">
    <state-bar :gold="current.gold" />
    <the-nav
      :active-block="activeBlock"
      :unchecked-achievements="uncheckedAchievements"
      @changeActiveTab="changeActiveTab"
      @resetUncheckedAchievements="resetUncheckedAchievements"
    />
    <main>
      <div class="container main-wrapper">
        <upgrades-block
          v-show="activeBlock === 'Upgrades'"
          :upgrades="upgradesToShow"
          :gold="current.gold"
          @upgradeCard="upgradeCard"
        />
        <achievements-block
          v-show="activeBlock === 'Achievements'"
          :achievements="achievements"
          :received-achievements="total.receivedAchievements"
        />
        <stats-block
          v-show="activeBlock === 'Stats'"
          :current="current"
          :total="total"
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
import UpgradesBlock from '@/components/UpgradesBlock/UpgradesBlock.vue';
import AchievementsBlock from '@/components/AchievementsBlock/AchievementsBlock.vue';
import StatsBlock from '@/components/StatsBlock/StatsBlock.vue';
import StateBar from '@/components/StateBar.vue';
import TheNav from '@/components/TheNav.vue';
import MonsterBlock from '@/components/MonsterBlock/MonsterBlock.vue';
import { calcGoldForKilling } from '@/shared/functions/formulas';
import {
  achievements,
  current,
  total,
  upgrades,
} from '@/shared/initialState/initialAppState';
import { filterAchievementsByProperty } from '@/shared/functions/achievements';

export default {
  name: 'MainLayout',
  components: {
    StatsBlock,
    AchievementsBlock,
    UpgradesBlock,
    MonsterBlock,
    TheNav,
    StateBar,
  },
  data() {
    return {
      total,
      current,
      upgrades,
      achievements,
      activeBlock: 'Upgrades',
      uncheckedAchievements: 0,
    };
  },
  computed: {
    upgradesToShow() {
      return this.upgrades.filter((upgrade) => upgrade.show);
    },
    lastUpgradeToShow() {
      return this.upgradesToShow[this.upgradesToShow.length - 1];
    },
    unreceivedAchievements() {
      return this.achievements.filter((a) => !a.received);
    },
    achievementsByTotal() {
      return filterAchievementsByProperty(this.unreceivedAchievements, 'total');
    },
  },
  watch: {
    'current.gold': function (val) {
      if (this.upgrades.length > this.upgradesToShow.length && val >= this.lastUpgradeToShow.cost) {
        const nextUpgradeToShowId = this.upgrades[this.upgradesToShow.length].id;
        this.unlockUpgrade(nextUpgradeToShowId);
      }
    },
    total: {
      handler() {
        if (this.achievementsByTotal.length) {
          this.checkAchievementsByValue(this.achievementsByTotal);
        }
      },
      deep: true,
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
  methods: {
    nextMonster() {
      this.current.monsterIndex++;
    },
    enrollGold(gold) {
      this.current.gold += gold;
      this.total.gold += gold;
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
    changeActiveTab(tab) {
      this.activeBlock = tab;
    },
    checkAchievementsByValue(achievementsArr) {
      achievementsArr.forEach((a) => {
        const deepProps = a.property.split('.');
        const val = deepProps.reduce((acc, cur) => acc[cur], this);

        if (val >= a.value) {
          const achievement = this.achievements.find((ach) => ach.id === a.id);
          achievement.received = true;
          achievement.hidden = false;
          this.receiveAchievement(achievement.id);
        }
      });
    },
    receiveAchievement(id) {
      // notify player
      console.log('receiveAchievement id:', id);
      this.total.receivedAchievements++;
      if (this.activeBlock !== 'Achievements') {
        this.uncheckedAchievements++;
      }
    },
    resetUncheckedAchievements() {
      this.uncheckedAchievements = 0;
    },
  },
};
</script>
