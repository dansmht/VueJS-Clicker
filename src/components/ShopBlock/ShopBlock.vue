<template>
  <div class="shop-block">
    <div class="scroll-wrapper">
      <ul class="shop-list">
        <li
          v-if="inactiveSapphires"
          class="reincarnate-button"
          :class="{ready: reincarnationTimer <= 0}"
          @click="reincarnate"
        >
          Reincarnate (you will receive {{ inactiveSapphires }} material sapphires)
          <span v-if="reincarnationTimer > 0">{{ reincarnationTimeLeft }}</span>
        </li>
        <li
          v-for="imp in improvements"
          :key="imp.id"
          class="improvement-card"
        >
          <div class="img">
            <img
              :src="require(`../../assets/images/improvements/improvement_${imp.id}.png`)"
              alt="upgrade"
            >
          </div>
          <div class="description">
            <h4 class="title">
              {{ imp.name }}
            </h4>
            <p class="text">
              {{ imp.description }}
              <span
                v-if="imp.duration"
                v-tooltip="getDuration(imp.duration)"
                style="white-space: nowrap"
              >(duration: {{ getDuration(imp.duration) }})</span>
            </p>
            <div class="parameters">
              <p class="param level">
                Type: {{ imp.type }}
              </p>
              <p class="param cost">
                Cost: {{ imp.cost }} {{ imp.cost === 1 ? 'sapphire' : 'sapphires' }}
              </p>
            </div>
          </div>
          <div
            v-tooltip="imp.cost > sapphires && 'You don\'t have enough sapphires'"
            class="icon"
            :class="{scalable: imp.cost <= sapphires}"
            @click="onClickHandler(imp.cost, imp.id, imp.type)"
          >
            <icon-plus :color="getIconColor(imp.cost)" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconPlus from '@/components/common/Icons/IconPlus.vue';
import { msToTime } from '@/shared/functions/timers';

export default {
  name: 'ShopBlock',
  components: { IconPlus },
  props: {
    skills: {
      type: Array,
      required: true,
    },
    sapphires: {
      type: Number,
      required: true,
    },
    inactiveSapphires: {
      type: Number,
      required: true,
    },
    reincarnationTimer: {
      type: Number,
      required: true,
    },
  },
  computed: {
    improvements() {
      return [...this.formatArray(this.skills, 'ability')].sort((a, b) => a.id - b.id);
    },
    reincarnationTimeLeft() {
      return msToTime(this.reincarnationTimer);
    },
  },
  methods: {
    formatArray(array, type) {
      return array
        .filter((skill) => !skill.received)
        .map((skill) => ({ type, ...skill }));
    },
    reincarnate() {
      if (this.reincarnationTimer <= 0 && window.confirm('Do you want to reincarnate? You will lose all upgrades!')) {
        this.$emit('reincarnate');
      }
    },
    onClickHandler(cost, id, type) {
      if (this.sapphires >= cost) {
        this.$emit('buyImprovement', { id, type, cost });
      }
    },
    getIconColor(cost) {
      return cost <= this.sapphires
        ? getComputedStyle(document.documentElement)
          .getPropertyValue('--font-main-color')
        : '#454545';
    },
    getDuration(ms) {
      return msToTime(ms);
    },
  },
};
</script>
