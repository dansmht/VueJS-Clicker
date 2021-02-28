// import { getRandomInRange } from '@/utils/getRandom';

const calcUpgradeCostByOneLevel = (level, baseUpgradeCost) => {
  const multiplier = 1.07 ** level;
  return Math.floor(baseUpgradeCost * multiplier);
};

const calcUpgradeValueByOneLevel = (growthRate) => growthRate;

export const calcUpgradeInfo = (
  count, level, baseUpgradeCost,
  availableGold, growthRate,
) => {
  let fullCost = 0;
  let fullValue = 0;
  let levelsToUp = count;
  let levelIdx = level;
  if (count) {
    for (let i = 0; i < count; i++) {
      fullCost += calcUpgradeCostByOneLevel(levelIdx, baseUpgradeCost);
      fullValue += calcUpgradeValueByOneLevel(growthRate);
      levelIdx++;
    }
  } else {
    let lastCost = 0;
    let lastValue = 0;
    levelsToUp = -1;
    do {
      lastCost = calcUpgradeCostByOneLevel(levelIdx, baseUpgradeCost);
      fullCost += lastCost;
      lastValue = calcUpgradeValueByOneLevel(growthRate);
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

const calcStage = (monsterIndex) => Math.floor((monsterIndex - 1) / 10);

export const calcMonsterHP = (monsterIndex, isBoss) => {
  const multiplier = isBoss ? 10 : 1;
  // const multiplier2 = 1 + (getRandomInRange(-25, 25) / 100);
  const multiplier2 = 1;
  const stage = calcStage(monsterIndex);
  const monsterHP = (10 * (stage + (1.55 ** stage)));
  return Math.ceil(monsterHP * multiplier * multiplier2);
};

export const calcGoldForKilling = (monsterIndex, isBoss) => {
  const monsterHP = calcMonsterHP(monsterIndex, isBoss);
  const multiplier = isBoss ? 1.025 : 1.015;
  return Math.floor(Math.ceil(monsterHP / 15) * (multiplier ** calcStage(monsterIndex)));
};
