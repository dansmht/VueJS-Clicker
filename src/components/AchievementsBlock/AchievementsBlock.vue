<template>
  <div class="achievements-block">
    <div class="scroll-wrapper">
      <div class="achievements-list">
        <achievements-item />
      </div>
    </div>
  </div>
</template>

<script>
import AchievementsItem from '@/components/AchievementsBlock/AchievementsItem.vue';

export default {
  name: 'AchievementsBlock',
  components: { AchievementsItem },
};
</script>
