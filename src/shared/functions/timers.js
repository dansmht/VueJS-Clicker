export const timersNames = {
  reincarnation: 'reincarnation',
};

export const convertMinutesToMs = (minutes) => {
  return minutes * 60 * 1000;
};

export const msToTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = +((ms % 60000) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
