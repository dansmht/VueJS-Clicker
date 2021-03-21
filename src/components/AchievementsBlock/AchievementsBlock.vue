<template>
  <div class="achievements-block">
    <div class="scroll-wrapper">
      <ul class="achievements-list">
        <achievements-item
          v-for="a in sortedAchievements"
          :key="a.id"
          :idx="a.id"
          :name="a.name"
          :description="a.description"
          :received="a.received"
          :hidden="a.hidden"
        />
      </ul>
    </div>
    <div class="achievements-received">
      <div>Achievements:</div>
      <div>
        {{ `${receivedAchievements}/${achievements.length}
      (${+(receivedAchievements / achievements.length * 100)}%)` }}
      </div>
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
    receivedAchievements: {
      type: Number,
      required: true,
    },
  },
  computed: {
    sortedAchievements() {
      return [...this.achievements]
        .sort((a, b) => (a.received > b.received ? -1 : 1))
        .sort((a, b) => (a.hidden > b.hidden ? 1 : -1));
    },
  },
};
</script>
