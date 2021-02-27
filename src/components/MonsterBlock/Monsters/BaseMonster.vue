<template>
  <div
    class="monster"
    @click.left="onClickHandler"
    @click.right="onClickHandler"
  >
    <component :is="`${monsterName.toLowerCase()}-monster`" />
  </div>
</template>

<script>
import RatMonster from '@/components/MonsterBlock/Monsters/SVG/RatMonster.vue';
import SpiderMonster from '@/components/MonsterBlock/Monsters/SVG/SpiderMonster.vue';

export default {
  name: 'BaseMonster',
  components: { SpiderMonster, RatMonster },
  props: {
    monsterName: {
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
