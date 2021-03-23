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
        <span
          v-tooltip="formattedValue"
          class="help"
        >
          {{ abbreviatedValue }}
        </span>
      </p>
      <div class="parameters">
        <p class="param level">
          Level: {{ level }}
        </p>
        <p class="param cost">
          <span
            v-tooltip="formattedCost"
            class="help"
          >
            Cost: {{ abbreviatedCost }}
          </span>
        </p>
      </div>
    </div>
    <div
      v-tooltip="!isAvailable && 'You don\'t have enough gold'"
      class="icon"
      :class="{
        scalable: isAvailable,
        pointer: isAvailable,
        help: !isAvailable
      }"
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
import { abbreviateNumber } from '@/shared/functions/abbreviateNumber';
import { formatNum } from '@/shared/functions/formatNum';
import { calcUpgradeInfo } from '@/shared/functions/formulas';

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
    upgradeInfo: {
      get() {
        return this.updateUpgradeInfo();
      },
      set(val) {
        return val;
      },
    },
    abbreviatedCost() {
      return abbreviateNumber(this.fullCost);
    },
    abbreviatedValue() {
      return abbreviateNumber(this.fullValue);
    },
    formattedCost() {
      return formatNum(this.fullCost);
    },
    formattedValue() {
      return formatNum(this.fullValue);
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
  watch: {
    gold() {
      if (this.purchaseCount === 0) {
        this.upgradeInfo = this.updateUpgradeInfo();
      }
    },
  },
  methods: {
    updateUpgradeInfo() {
      return calcUpgradeInfo(this.purchaseCount, this.level, this.cost, this.gold, this.growthRate);
    },
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
