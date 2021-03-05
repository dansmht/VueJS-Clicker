<template>
  <div
    class="monster"
    @click="onClickHandler"
  >
    <component :is="componentName" />
  </div>
</template>

<script>
import RatKingMonster from '@/components/MonsterBlock/Monsters/SVG/RatKingMonster.vue';
import VoidSpecterMonster from '@/components/MonsterBlock/Monsters/SVG/VoidSpecterMonster.vue';
import RatMonster from '@/components/MonsterBlock/Monsters/SVG/RatMonster.vue';
import SpiderMonster from '@/components/MonsterBlock/Monsters/SVG/SpiderMonster.vue';
import EbonyStatueMonster from '@/components/MonsterBlock/Monsters/SVG/EbonyStatueMonster.vue';
import OvergrownBeetleMonster from '@/components/MonsterBlock/Monsters/SVG/OvergrownBeetleMonster.vue';
import WildBoneDogMonster from '@/components/MonsterBlock/Monsters/SVG/WildBoneDogMonster.vue';
import SwordsKeeperMonster from '@/components/MonsterBlock/Monsters/SVG/SwordsKeeperMonster.vue';

export default {
  name: 'BaseMonster',
  components: {
    SwordsKeeperMonster,
    RatKingMonster,
    VoidSpecterMonster,
    RatMonster,
    SpiderMonster,
    EbonyStatueMonster,
    OvergrownBeetleMonster,
    WildBoneDogMonster,
  },
  props: {
    componentName: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickHandler() {
      this.$emit('hitMonster', true);
    },
  },
};
</script>
