import { getRandomInRange } from '@/utils/getRandom';

const calcUpgradeCostByOneLevel = (level, baseUpgradeCost, upgradeIdx) => {
  const multiplier = 1.07 + ((upgradeIdx - 1) * 0.004);
  return Math.floor(baseUpgradeCost * multiplier ** level);
};

const calcUpgradeValueByOneLevel = (level, growthRate) => (level + 1) * growthRate;

export const calcUpgradeInfo = (
  count, level, baseUpgradeCost,
  upgradeIdx, availableGold, growthRate,
) => {
  let fullCost = 0;
  let fullValue = 0;
  let levelsToUp = count;
  let levelIdx = level;
  if (count) {
    for (let i = 0; i < count; i++) {
      fullCost += calcUpgradeCostByOneLevel(levelIdx, baseUpgradeCost, upgradeIdx);
      fullValue += calcUpgradeValueByOneLevel(levelIdx, growthRate);
      levelIdx++;
    }
  } else {
    let lastCost = 0;
    let lastValue = 0;
    levelsToUp = -1;
    do {
      lastCost = calcUpgradeCostByOneLevel(levelIdx, baseUpgradeCost, upgradeIdx);
      fullCost += lastCost;
      lastValue = calcUpgradeValueByOneLevel(levelIdx, growthRate);
      fullValue += lastValue;
      levelsToUp++;
      levelIdx++;
    } while (availableGold > fullCost);
    if (fullCost > lastCost) {
      fullCost -= lastCost;
      fullValue -= lastValue;
    }
  }
  return {
    fullCost,
    fullValue,
    levelsToUp,
  };
};

export const calcGoldToEnroll = (currentMonsterIndex) => currentMonsterIndex;

export const calcMonsterHP = (monsterIndex, isBoss) => {
  const multiplier = isBoss ? 10 : 1;
  const multiplier2 = 1 + (getRandomInRange(-25, 25) / 100);
  return parseInt((10 + (2 * (1.2 ** monsterIndex))) * multiplier * multiplier2, 10);
};

export const calcGoldForKilling = (monsterIndex, isBoss) => {
  const multiplier = isBoss ? 12 : 1;
  return 5 * monsterIndex * multiplier;
};
