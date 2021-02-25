const calcUpgradeCostByOneLevel = (level, baseCost, upgradeIdx) => {
  const multiplier = 1.07 + ((upgradeIdx - 1) * 0.004);
  return Math.floor(baseCost * multiplier ** level);
};

export const calcUpgradeCostAndLevelsToUp = (count, level, baseCost, upgradeIdx, availableGold) => {
  let fullCost = 0;
  let levelsToUp = count;
  let levelIdx = level;
  if (count) {
    for (let i = 0; i < count; i++) {
      fullCost += calcUpgradeCostByOneLevel(levelIdx, baseCost, upgradeIdx);
      levelIdx++;
    }
  } else {
    let lastCost = 0;
    levelsToUp = -1;
    do {
      lastCost = calcUpgradeCostByOneLevel(levelIdx, baseCost, upgradeIdx);
      fullCost += lastCost;
      levelsToUp++;
      levelIdx++;
    } while (availableGold > fullCost);
    if (fullCost > lastCost) {
      fullCost -= lastCost;
    }
  }
  return { fullCost, levelsToUp };
};
