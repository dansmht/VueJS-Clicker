export const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomAnotherIndex = (prevIndex, maxIndex) => {
  let idx;
  do {
    idx = getRandomInRange(0, maxIndex);
  } while (prevIndex === idx);

  return idx;
};
