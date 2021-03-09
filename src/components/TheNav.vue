<template>
  <nav class="nav">
    <div class="container">
      <ul class="nav-list">
        <li
          v-for="tab in tabs"
          :key="tab"
          class="nav-list-item"
          :class="{active: tab === activeBlock}"
          @click="changeActiveTab(tab)"
        >
          {{ tab }}
          <span v-if="uncheckedAchievements && tab === 'Achievements'">
            ({{ uncheckedAchievements }})
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNav',
  props: {
    activeBlock: {
      type: String,
      required: true,
    },
    uncheckedAchievements: {
      type: Number,
      required: true,
    },
  },
  computed: {
    tabs: {
      get() {
        return ['Upgrades', 'Achievements', 'Stats', 'Shop', 'Settings'];
      },
    },
  },
  methods: {
    changeActiveTab(tab) {
      if (tab !== this.activeBlock) {
        this.$emit('changeActiveTab', tab);
        if (tab === 'Achievements' && this.uncheckedAchievements !== 0) {
          this.$emit('resetUncheckedAchievements');
        }
      }
    },
  },
};
</script>
