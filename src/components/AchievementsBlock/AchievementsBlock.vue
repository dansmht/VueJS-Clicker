<template>
  <div class="achievements-block">
    <div class="scroll-wrapper">
      <ul class="achievements-list">
        <achievements-item
          v-for="a in achievements"
          :key="a.id"
          :idx="a.id"
          :name="a.name"
          :description="a.description"
          :received="a.received"
          :hidden="a.hidden"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import AchievementsItem from '@/components/AchievementsBlock/AchievementsItem.vue';

export default {
  name: 'AchievementsBlock',
  components: { AchievementsItem },
  props: {
    achievements: {
      type: Array,
      required: true,
    },
  },
};
</script>
