<template>
  <div id="app">
    <state-bar :gold="gold" />
    <the-nav />
    <main>
      <div class="container main-wrapper">
        <router-view :upgrades="upgrades" />
        <monster-block
          :current-monster-index="currentMonsterIndex"
          :damage="damage"
          :damage-per-sec="damagePerSec"
          @nextMonster="nextMonster"
        />
      </div>
    </main>
  </div>
</template>

<script>
import StateBar from '@/components/StateBar.vue';
import TheNav from '@/components/TheNav.vue';
import MonsterBlock from '@/components/MonsterBlock/MonsterBlock.vue';

export default {
  components: { MonsterBlock, TheNav, StateBar },
  data() {
    return {
      gold: 0,
      goldPerSec: 0,
      damage: 1,
      damagePerSec: 2,
      currentMonsterIndex: 1,
      upgrades: [{
        id: 1,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 1,
      }, {
        id: 2,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 10,
      }, {
        id: 3,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 100,
      }, {
        id: 4,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 1000,
      }, {
        id: 5,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 10000,
      }, {
        id: 6,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 10000,
      }, {
        id: 7,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 100000,
      }, {
        id: 8,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 1000000,
      }, {
        id: 9,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 1000000,
      }, {
        id: 10,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 11,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 12,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 13,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 14,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 15,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 16,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 17,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 18,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 10000001,
      }, {
        id: 19,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }, {
        id: 20,
        name: 'Test name',
        description: 'Effect',
        level: 0,
        cost: 11000000,
      }],
    };
  },
  methods: {
    nextMonster() {
      this.currentMonsterIndex++;
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

:root {
  // sizes
  --working-width: 1040px;
  --options-block-width: 500px;
  --monster-block-width: 360px;
  --upgrade-card-height: 90px;
  --smallest-font: 12px;
  --small-font: 14px;
  --default-font: 16px;
  --large-font: 18px;

  // background colors
  --primary-color: #303030;
  --darker-color: #202020;
  --darkest-color: #101010;

  // font colors
  --font-main-color: #fafafa;
  --font-sub-color: #b0b0b0;
}

* {
  font-family: Ubuntu, Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: var(--font-main-color);
  cursor: default;
  user-select: none;
}

img {
  pointer-events: none;
}

ul {
  list-style: none;
}

html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

body {
  background: var(--primary-color);
  font-size: var(--default-font);
}

.container {
  max-width: var(--working-width);
  margin: 0 auto;
  height: 100%;
}

.main-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
