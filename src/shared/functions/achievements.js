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

export const checkAchievementsByValue = (achievements, state) => {
  achievements.forEach((a) => {
    const deepProps = a.property.split('.');
    const val = deepProps.reduce((acc, cur) => acc[cur], state);

    if (val >= a.value) {
      const achievement = state.achievements.find((ach) => ach.id === a.id);
      achievement.received = true;
      achievement.hidden = false;
    }
  });
};
