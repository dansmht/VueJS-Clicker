<template>
  <li class="achievements-item">
    <div class="achievements-img">
      <img
        :src="achievementImgSrc"
        alt="Achievement"
      >
    </div>
    <div
      class="achievements-description"
      :class="{'hidden-achievement': hidden}"
    >
      <div
        class="title"
        :class="{bright: received}"
      >
        {{ title }}
      </div>
      <div
        v-if="!hidden"
        class="text"
      >
        {{ description }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'AchievementsItem',
  props: {
    idx: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    received: {
      type: Boolean,
      required: true,
    },
    hidden: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    title() {
      return this.hidden ? '???' : this.name;
    },
    achievementImgSrc() {
      return !this.received
        ? require(`../../assets/images/achievements/achievement_${this.idx}.png`)
        : require('../../assets/images/achievements/unreceived.png');
    },
  },
};
</script>
