<template>
  <div
    class="monster"
    @click.left="onClickHandler"
    @click.right="onClickHandler"
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

export default {
  name: 'BaseMonster',
  components: {
    RatKingMonster,
    VoidSpecterMonster,
    RatMonster,
    SpiderMonster,
    EbonyStatueMonster,
  },
  props: {
    componentName: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickHandler() {
      this.$emit('hitMonster');
    },
  },
};
</script>

<style lang="scss" scoped>
.monster {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--monster-block-width);
}
</style>
