<template>
  <div
    id="app"
    @contextmenu.prevent
  >
    <state-bar :gold="current.gold" />
    <the-nav />
    <main>
      <div class="container main-wrapper">
        <router-view
          :upgrades="upgrades"
          :gold="current.gold"
          @upgradeCard="upgradeCard"
        />
        <monster-block
          :monster-index="current.monsterIndex"
          :damage="current.damage"
          :damage-per-sec="current.damagePerSec"
          @enrollGold="enrollGold"
          @hitMonster="hitMonster"
          @killMonster="killMonster"
        />
      </div>
    </main>
  </div>
</template>

<script>
import StateBar from '@/components/StateBar.vue';
import TheNav from '@/components/TheNav.vue';
import MonsterBlock from '@/components/MonsterBlock/MonsterBlock.vue';
import { calcGoldForKilling } from '@/shared/functions/formulas';
import { current, total, upgrades } from '@/shared/initialState/initialAppState';

export default {
  components: { MonsterBlock, TheNav, StateBar },
  data() {
    return {
      total,
      current,
      upgrades,
    };
  },
  beforeCreate() {
    // test for multitabs
    window.session = Math.random().toString();
    localStorage.setItem('session', window.session);
    const onStorage = (e) => {
      if (e.key === 'session' && e.newValue !== window.session) {
        localStorage.setItem('multitab', window.session);
      }
      if (e.key === 'multitab' && e.newValue && e.newValue !== window.session) {
        window.removeEventListener('storage', onStorage);
        localStorage.setItem('session', localStorage.getItem('multitab'));
        localStorage.removeItem('multitab');
        alert('Multitab');
      }
    };
    window.addEventListener('storage', onStorage);

    // second way
    // window.addEventListener('storage', () => {
    //   window.alert('another window or tab is working on the same localStorage');
    //   window.close();
    // }, false);
    //
    // localStorage.setItem('Sentinel', Math.random().toString());
  },
  methods: {
    nextMonster() {
      this.current.monsterIndex++;
    },
    enrollGold(gold) {
      this.current.gold += gold;
    },
    writeOffGold(gold) {
      this.current.gold -= gold;
    },
    upgradeCard({
      id,
      gold,
      levels,
      value,
    }) {
      this.writeOffGold(gold);
      const upgrade = this.upgrades.find((u) => u.id === id);
      upgrade.level += levels;
      if (id === 1) {
        this.current.damage += value;
      } else {
        this.current.damagePerSec += value;
      }
    },
    hitMonster(damage, isByClick) {
      if (isByClick) {
        this.total.clicks++;
      }
      this.total.damage += damage;
    },
    killMonster(isBoss) {
      this.enrollGold(calcGoldForKilling(this.current.monsterIndex, isBoss));
      this.nextMonster();
      if (isBoss) {
        this.total.kills.bosses++;
      }
      this.total.kills.monsters++;
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

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: var(--font-main-color);
    color: var(--darkest-color);
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: var(--font-main-color);
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
