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
    <div
      class="icon"
      :class="{gray: fullCost > gold}"
      @click="onClickHandler"
    >
      <icon-plus :color="iconColor" />
    </div>
  </li>
</template>

<script>
import IconPlus from '@/components/common/Icons/IconPlus.vue';
import { abbreviateNumber } from '@/utils/abbreviateNumber';
import { calcUpgradeCostAndLevelsToUp } from '@/utils/formulas';

export default {
  name: 'UpgradeCard',
  components: { IconPlus },
  props: {
    idx: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    gold: {
      type: Number,
      required: true,
    },
    purchaseCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    abbreviatedCost() {
      return abbreviateNumber(this.fullCost);
    },
    fullCostAndLevelsToUp() {
      return calcUpgradeCostAndLevelsToUp(
        this.purchaseCount,
        this.level,
        this.cost,
        this.idx,
        this.gold,
      );
    },
    fullCost() {
      return this.fullCostAndLevelsToUp.fullCost;
    },
    levelsToUp() {
      return this.fullCostAndLevelsToUp.levelsToUp;
    },
    iconColor() {
      const doc = getComputedStyle(document.documentElement);
      return this.gold >= this.fullCost
        ? doc.getPropertyValue('--font-main-color')
        : doc.getPropertyValue('--font-sub-color');
    },
  },
  methods: {
    onClickHandler() {
      if (this.gold >= this.fullCost) {
        this.$emit('writeOffGold', this.fullCost);
        this.$emit('levelUpSelf', { id: this.idx, levels: this.levelsToUp });
      }
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
