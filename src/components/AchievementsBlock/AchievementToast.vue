<template>
  <div
    class="achievement-toast"
    v-on="$listeners"
  >
    <div class="img-wrapper">
      <img
        :src="require(`../../assets/images/achievements/achievement_${id}.png`)"
        alt="Achievement"
      >
    </div>
    <div class="toast-text">
      Achievement received!
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementToast',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>
