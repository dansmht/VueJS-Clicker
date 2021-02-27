<template>
  <div
    id="app"
    @contextmenu.prevent
  >
    <state-bar :gold="gold" />
    <the-nav />
    <main>
      <div class="container main-wrapper">
        <router-view
          :upgrades="upgrades"
          :gold="gold"
          @writeOffGold="writeOffGold"
          @levelUpSelf="levelUpSelf"
        />
        <monster-block
          :current-monster-index="currentMonsterIndex"
          :damage="damage"
          :damage-per-sec="damagePerSec"
          @nextMonster="nextMonster"
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

export default {
  components: { MonsterBlock, TheNav, StateBar },
  data() {
    return {
      total: {
        clicks: 0,
        gold: 0,
        damage: 0,
        kills: {
          monsters: 0,
          bosses: 0,
        },
      },
      gold: 1234567890,
      goldPerSec: 0,
      damage: 10,
      damagePerSec: 2,
      currentMonsterIndex: 1,
      upgrades: [{
        id: 1,
        name: 'Desecrated Flame',
        description: 'Increase damage per click by',
        level: 0,
        cost: 10,
      }, {
        id: 2,
        name: 'Gold Bag',
        description: 'Increase damage per second by',
        level: 0,
        cost: 50,
      }, {
        id: 3,
        name: 'Helmet Of The Wind',
        description: 'Increase damage per second by',
        level: 0,
        cost: 250,
      }, {
        id: 4,
        name: 'Cursed Sword',
        description: 'Increase damage per second by',
        level: 0,
        cost: 1250,
      }, {
        id: 5,
        name: 'Afflatus',
        description: 'Increase damage per second by',
        level: 0,
        cost: 6250,
      }, {
        id: 6,
        name: 'Ebony Breastplate',
        description: 'Increase damage per second by',
        level: 0,
        cost: 31250,
      }, {
        id: 7,
        name: 'Fallen Hand',
        description: 'Increase damage per second by',
        level: 0,
        cost: 100000,
      }, {
        id: 8,
        name: 'Old Boots Of The Deceased',
        description: 'Increase damage per second by',
        level: 0,
        cost: 1000000,
      }, {
        id: 9,
        name: 'Ring Of Will',
        description: 'Increase damage per second by',
        level: 0,
        cost: 1000000,
      }, {
        id: 10,
        name: 'Beckoning Amulet Of Pain',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 11,
        name: 'Screaming Lantern',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 12,
        name: 'Key Holding',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 13,
        name: 'Lost Empire Banner',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 14,
        name: 'Enchantment Prism',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 15,
        name: 'Amulet Of Time',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 16,
        name: 'Secret Restraining Seal',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 17,
        name: 'Ebony Rune Of Blood',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 18,
        name: 'Maelstrom Shield',
        description: 'Increase damage per second by',
        level: 0,
        cost: 10000001,
      }, {
        id: 19,
        name: 'Spy Of The Order Of The Ebony',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }, {
        id: 20,
        name: 'Sacrifice Knife',
        description: 'Increase damage per second by',
        level: 0,
        cost: 11000000,
      }],
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
      this.currentMonsterIndex++;
    },
    enrollGold(gold) {
      this.gold += gold;
    },
    writeOffGold(gold) {
      this.gold -= gold;
    },
    levelUpSelf({ id, levels }) {
      const upgrade = this.upgrades.find((u) => u.id === id);
      upgrade.level += levels;
    },
    hitMonster(damage, isByClick) {
      if (isByClick) {
        this.total.clicks++;
      }
      this.total.damage += damage;
    },
    killMonster(isBoss) {
      if (isBoss) {
        this.total.kills.bosses++;
      } else {
        this.total.kills.monsters++;
      }
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
