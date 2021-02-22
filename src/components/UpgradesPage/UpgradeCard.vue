<template>
  <li class="upgrade-card">
    <div class="img">
      <img
        :src="require(`../../assets/images/upgrades/upgrade_${idx}.png`)"
        alt="upgrade"
      >
    </div>
    <div class="description">
      <h4 class="title">
        {{ name }}
      </h4>
      <p class="text">
        {{ description }}
      </p>
      <div class="parameters">
        <p class="param level">
          Уровень: {{ level }}
        </p>
        <p class="param cost">
          Стоимость: {{ abbreviatedCost }}
        </p>
      </div>
    </div>
    <div class="icon">
      <icon-plus />
    </div>
  </li>
</template>

<script>
import IconPlus from '@/components/common/Icons/IconPlus.vue';
import { abbreviateNumber } from '@/utils/abbreviateNumber';

export default {
  name: 'UpgradeCard',
  components: { IconPlus },
  props: {
    idx: {
      type: Number,
      required: true,
    },
    name: {
      type: Number,
      required: true,
    },
    description: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  computed: {
    abbreviatedCost() {
      return abbreviateNumber(this.cost);
    },
  },
};
</script>

<style lang="scss" scoped>
.upgrade-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--upgrade-card-height);
  margin: 10px 0;
  background: var(--darker-color);

  .img {
    width: var(--upgrade-card-height);
    height: var(--upgrade-card-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(var(--upgrade-card-height) - 20px);
    margin-left: 18px;
    flex-grow: 1;

    .title {
      font-weight: normal;
      line-height: 18px;
      color: var(--font-main-color);
    }

    .text {
      color: var(--font-sub-color);
      font-size: var(--smallest-font);
      line-height: 14px;
    }

    .parameters {
      font-size: var(--smallest-font);
      line-height: 14px;
      display: flex;

      .param {
        color: var(--font-sub-color);
        width: calc((var(--options-block-width) - 90px - 18px - 70px - 20px) / 2);
      }
    }
  }

  .icon {
    margin: 0 20px;
    width: 30px;
    height: 30px;
  }

  &:first-child {
    margin-top: 0;
  }

  //&:last-child {
  //  margin-bottom: 0;
  //}
}
</style>
