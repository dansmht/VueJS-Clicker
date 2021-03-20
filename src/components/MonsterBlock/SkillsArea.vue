<template>
  <div class="skills-area">
    <h3 class="label">
      Skills:
    </h3>
    <ul class="skills-list">
      <li
        v-for="s in skills"
        :key="s.id"
        v-tooltip="!s.received && 'Locked'"
        class="skills-list-item"
        :class="{ready: s.received && getTimer(s.id) <= 0}"
        @click="onClickHandler(s)"
      >
        <div
          v-if="s.received && getTimer(s.id) > 0"
          class="time-left"
        >
          {{ time(getTimer(s.id)) }}
        </div>
        <img
          v-if="!s.received"
          src="../../assets/images/achievements/unreceived.png"
          alt="locked"
        >
        <img
          v-else
          :src="require(`../../assets/images/improvements/improvement_${s.id}.png`)"
          alt="skill"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { msToTime } from '@/shared/functions/timers';

export default {
  name: 'SkillsArea',
  props: {
    skills: {
      type: Array,
      required: true,
    },
    timers: {
      type: Object,
      required: true,
    },
    damagePerSec: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClickHandler(skill) {
      if (skill.received && this.getTimer(skill.id) <= 0) {
        this.$emit('resetTimer', `skill${skill.id}`, skill.cooldownTimeInMinutes);
        switch (skill.id) {
          case 1:
            this.interval(() => this.$emit('hitMonster'), skill.duration, 200);
            break;
          case 4:
            this.$emit('enrollGold', this.damagePerSec * 10);
            break;
          case 7:
            this.$emit('toggleBerserkMode');
            this.interval(() => this.$emit('toggleBerserkMode'), skill.duration, skill.duration);
            break;
          case 9:
            this.$emit('executeMonster');
            break;
          default:
            break;
        }
      }
    },
    interval(cb, duration, frequency = 1000) {
      let timeLeft = duration;
      const intervalId = setInterval(() => {
        timeLeft -= frequency;
        cb();
        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }
      }, frequency);
    },
    getTimer(skillId) {
      return this.timers[`skill${skillId}`];
    },
    time(ms) {
      return msToTime(ms);
    },
  },
};
</script>
