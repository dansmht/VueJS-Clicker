export const filterAchievementsByProperty = (achievements, property) => {
  return achievements.filter((a, i, arr) => {
    const prop = a.property;
    for (let j = 0; j < i; j++) {
      if (arr[j].property === prop) {
        return arr[j].value > a.value;
      }
    }
    return prop.startsWith(property);
  });
};
