<template>
  <div class="vue-js-clicker">
    <state-bar
      :gold="current.gold"
      :sapphires="current.sapphires"
      :inactive-sapphires="current.inactiveSapphires"
    />
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
          :real-dps="realDPS"
        />
        <shop-block
          v-show="activeBlock === 'Shop'"
          :skills="skills"
          :sapphires="current.sapphires"
          :inactive-sapphires="current.inactiveSapphires"
          :reincarnation-timer="timers.reincarnation"
          @reincarnate="reincarnate"
          @buyImprovement="buyImprovement"
        />
        <settings-block
          v-show="activeBlock === 'Settings'"
        />
        <monster-block
          :monster-index="current.monsterIndex"
          :damage="current.damage"
          :damage-per-sec="realDPS"
          :skills="skills"
          :timers="timers"
          @enrollGold="enrollGold"
          @hitMonster="hitMonster"
          @killMonster="killMonster"
          @resetTimer="resetTimer"
          @toggleBerserkMode="toggleBerserkMode"
        />
      </div>
    </main>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs';
import UpgradesBlock from '@/components/UpgradesBlock/UpgradesBlock.vue';
import AchievementsBlock from '@/components/AchievementsBlock/AchievementsBlock.vue';
import StatsBlock from '@/components/StatsBlock/StatsBlock.vue';
import ShopBlock from '@/components/ShopBlock/ShopBlock.vue';
import SettingsBlock from '@/components/SettingsBlock/SettingsBlock.vue';
import StateBar from '@/components/StateBar.vue';
import TheNav from '@/components/TheNav.vue';
import MonsterBlock from '@/components/MonsterBlock/MonsterBlock.vue';
import AchievementToast from '@/components/AchievementsBlock/AchievementToast.vue';
import { calcGoldForKilling } from '@/shared/functions/formulas';
import {
  achievements,
  current,
  skills,
  timers,
  total,
  upgrades,
} from '@/shared/initialState/initialAppState';
import { filterAchievementsByProperty } from '@/shared/functions/achievements';
import { convertMinutesToMs, timersNames } from '@/shared/functions/timers';
import { closeMultiTabListener } from '@/shared/functions/multitabs';

const initialState = {
  total: JSON.parse(JSON.stringify(total)),
  current: JSON.parse(JSON.stringify(current)),
  upgrades: JSON.parse(JSON.stringify(upgrades)),
  achievements,
  skills: JSON.parse(JSON.stringify(skills)),
  timers,
  activeBlock: 'Upgrades',
  uncheckedAchievements: 0,
  berserkMode: false,
  multipliers: {
    dps: {
      berserk: 1,
    },
  },
};

export default {
  name: 'MainLayout',
  components: {
    SettingsBlock,
    ShopBlock,
    StatsBlock,
    AchievementsBlock,
    UpgradesBlock,
    MonsterBlock,
    TheNav,
    StateBar,
  },
  data() {
    return initialState;
  },
  computed: {
    realDPS() {
      const multiplier = Object.values(this.multipliers.dps).reduce((acc, cur) => acc * cur, 1);
      return Math.floor(this.current.damagePerSec * multiplier);
    },
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
    localStorage.setItem('ATTENTION', 'Please do not change anything here, otherwise the consequences will not please you.'.toUpperCase());

    closeMultiTabListener();
  },
  async created() {
    const data = localStorage.getItem('data');
    const hashedData = localStorage.getItem('secret');

    if (!data || !hashedData) {
      this.resetPlayerProgress();
    } else {
      const isMatched = await bcrypt.compare(data, hashedData);

      if (!isMatched) {
        this.resetPlayerProgress();
      } else {
        this.syncWithLocalStorage();
      }
    }

    setInterval(this.saveGame, 5000);
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.$emit('loaded');
      }
    };
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
        if (this.berserkMode) {
          this.multipliers.dps.berserk += 0.01;
        }
      }
      this.total.damage += damage;
    },
    killMonster(isBoss) {
      this.enrollGold(calcGoldForKilling(this.current.monsterIndex, isBoss));
      this.rollForSapphire(isBoss);
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
    buyImprovement({ id, type, cost }) {
      if (type === 'ability') {
        const improvement = this.skills.find((u) => u.id === id);
        improvement.received = true;
      }
      this.current.sapphires -= cost;
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
    toggleBerserkMode() {
      this.berserkMode = !this.berserkMode;
      if (!this.berserkMode) {
        this.multipliers.dps.berserk = 1;
      }
    },
    receiveAchievement(id) {
      this.$toast({
        component: AchievementToast,
        props: { id },
        listeners: {
          click: () => {
            this.changeActiveTab('Achievements');
            this.resetUncheckedAchievements();
          },
        },
      });
      this.total.receivedAchievements++;
      if (this.activeBlock !== 'Achievements') {
        this.uncheckedAchievements++;
      }
    },
    resetUncheckedAchievements() {
      this.uncheckedAchievements = 0;
    },
    rollForSapphire(isBoss) {
      if (isBoss) {
        if (Math.random() < 0.5) {
          this.current.inactiveSapphires++;
          this.total.sapphires++;
        }
      }
      if (Math.random() < 0.01) {
        this.current.inactiveSapphires++;
        this.total.sapphires++;
      }
    },
    startTimer(timer) {
      const timerId = setInterval(() => {
        this.timers[timer] -= 1000;
        if (this.timers[timer] <= 0) {
          clearInterval(timerId);
        }
      }, 1000);
    },
    resetTimer(timer, minutes) {
      this.timers[timer] = convertMinutesToMs(minutes);
      this.startTimer(timer);
    },
    startAllTimers() {
      Object.keys(this.timers).forEach((key) => {
        if (this.timers[key] > 0) {
          this.startTimer(key);
        }
      });
    },
    reincarnate() {
      this.total.reincarnatedTimes++;
      const tempSapphires = this.current.sapphires + this.current.inactiveSapphires;
      this.resetTimer(timersNames.reincarnation, 5);
      // reset current stats and upgrades
      this.current = JSON.parse(JSON.stringify(current));
      this.upgrades = JSON.parse(JSON.stringify(upgrades));
      this.current.sapphires = tempSapphires;
    },
    resetPlayerProgress() {
      const dataToLocalStorage = JSON.stringify({
        total: JSON.parse(JSON.stringify(total)),
        current: JSON.parse(JSON.stringify(current)),
        upgrades: JSON.parse(JSON.stringify(upgrades)),
        achievements: JSON.parse(JSON.stringify(achievements)),
        timers: JSON.parse(JSON.stringify(timers)),
        skills: JSON.parse(JSON.stringify(skills)),
        activeBlock: 'Upgrades',
        uncheckedAchievements: 0,
      });

      this.saveDataToLocalStorage(dataToLocalStorage);
    },
    async saveDataToLocalStorage(data) {
      const salt = await bcrypt.genSalt(10);
      const hashedData = await bcrypt.hash(data, salt);
      localStorage.setItem('data', data);
      localStorage.setItem('secret', hashedData);
    },
    syncWithLocalStorage() {
      const dataToSync = JSON.parse(localStorage.getItem('data'));

      Object.assign(this, initialState, dataToSync);

      this.startAllTimers();
    },
    saveGame() {
      const dataToSave = JSON.stringify({
        total: this.total,
        current: this.current,
        upgrades: this.upgrades,
        achievements: this.achievements,
        timers: this.timers,
        skills: this.skills,
        activeBlock: this.activeBlock,
        uncheckedAchievements: this.uncheckedAchievements,
      });

      this.saveDataToLocalStorage(dataToSave);
    },
  },
};
</script>
