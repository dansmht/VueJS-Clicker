<template>
  <div class="stats-block">
    <div class="scroll-wrapper">
      <div class="stats-wrapper">
        <div class="stats-divider">
          <stats-item
            v-for="item in damageList"
            :key="item.title"
            :title="item.title"
            :value="item.value"
          />
        </div>
        <div class="stats-divider">
          <stats-item
            v-for="item in restStatsList"
            :key="item.title"
            :title="item.title"
            :value="item.value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsItem from '@/components/StatsBlock/StatsItem.vue';

export default {
  name: 'StatsBlock',
  components: { StatsItem },
  props: {
    current: {
      type: Object,
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
    realDps: {
      type: Number,
      required: true,
    },
  },
  computed: {
    damageList() {
      return [{
        title: 'Damage Per Click:',
        value: this.current.damage,
      }, {
        title: 'Damage Per Second:',
        value: this.current.damagePerSec,
      }, {
        title: 'Real Damage Per Second:',
        value: this.realDps,
      }];
    },
    restStatsList() {
      return [{
        title: 'Total Damage Dealt:',
        value: this.total.damage,
      }, {
        title: 'Total Gold Earned:',
        value: this.total.gold,
      }, {
        title: 'Total Clicks Done:',
        value: this.total.clicks,
      }, {
        title: 'Total Number Of Killed Monsters',
        value: this.total.kills.monsters,
      }, {
        title: 'Total Number Of Killed Bosses:',
        value: this.total.kills.bosses,
      }, {
        title: 'Total Number Of Purchased Levels:',
        value: this.total.purchasedLevels,
      }, {
        title: 'Received Achievements:',
        value: this.total.receivedAchievements,
      }, {
        title: 'Received Sapphires:',
        value: this.total.sapphires,
      }, {
        title: 'Reincarnated Times:',
        value: this.total.reincarnatedTimes,
      }];
    },
  },
};
</script>
