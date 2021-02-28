export const abbreviateNumber = (value) => {
  let newValue = value;
  if (value >= 1000) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const { length } = `${value}`;
    const suffixNum = Math.floor((length - 1) / 3);
    const numberForDivide = 10 ** (suffixNum * 3);
    const shortValue = Number((value / numberForDivide).toFixed(3).replace(/\d$/, ''));
    newValue = `${shortValue}${suffixes[suffixNum]}`;
  }
  return newValue;
};
