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
        {{ `${description} ${fullValue}` }}
      </p>
      <div class="parameters">
        <p class="param level">
          Уровень: {{ level }}
        </p>
        <p class="param cost">
          <span v-tooltip="formattedCost">
            Стоимость: {{ abbreviatedCost }}
          </span>
        </p>
      </div>
    </div>
    <div
      v-tooltip="!isAvailable && 'You don\'t have enough gold'"
      class="icon"
      :class="{scalable: isAvailable}"
      @click="onClickHandler"
    >
      <component
        :is="level ? 'icon-up-arrow' : 'icon-plus'"
        :color="iconColor"
      />
    </div>
  </li>
</template>

<script>
import IconPlus from '@/components/common/Icons/IconPlus.vue';
import IconUpArrow from '@/components/common/Icons/IconUpArrow.vue';
import { abbreviateNumber } from '@/utils/abbreviateNumber';
import { formatNum } from '@/utils/formatNum';
import { calcUpgradeInfo } from '@/utils/formulas';

export default {
  name: 'UpgradeCard',
  components: {
    IconUpArrow,
    IconPlus,
  },
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
    growthRate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    abbreviatedCost() {
      return abbreviateNumber(this.fullCost);
    },
    formattedCost() {
      return formatNum(this.fullCost);
    },
    upgradeInfo() {
      return calcUpgradeInfo(
        this.purchaseCount,
        this.level,
        this.cost,
        this.idx,
        this.gold,
        this.growthRate,
      );
    },
    fullCost() {
      return this.upgradeInfo.fullCost;
    },
    fullValue() {
      return this.upgradeInfo.fullValue;
    },
    levelsToUp() {
      return this.upgradeInfo.levelsToUp;
    },
    isAvailable() {
      return this.gold >= this.fullCost;
    },
    iconColor() {
      return this.isAvailable
        ? getComputedStyle(document.documentElement)
          .getPropertyValue('--font-main-color')
        : '#454545';
    },
  },
  methods: {
    onClickHandler() {
      if (this.gold >= this.fullCost) {
        this.$emit('upgradeCard', {
          id: this.idx,
          gold: this.fullCost,
          levels: this.levelsToUp,
          value: this.fullValue,
        });
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

        span {
          color: var(--font-sub-color);
        }
      }
    }
  }

  .icon {
    margin: 0 20px;
    width: 30px;
    height: 30px;

    &.scalable:hover {
      transform: scale(1.25);
    }
  }

  &:first-child {
    margin-top: 0;
  }
}
</style>
