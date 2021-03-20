import { convertMinutesToMs } from '@/shared/functions/timers';

export const initialSkills = [{
  id: 1,
  name: 'Fury',
  description: 'Automatically performs 5 clicks per second',
  duration: convertMinutesToMs(0.5),
  cost: 1,
  cooldownTimeInMinutes: 1,
  received: false,
}, {
  id: 4,
  name: 'Greed',
  description: 'Gain gold depended on your DPS',
  duration: 0,
  cost: 2,
  cooldownTimeInMinutes: 2,
  received: false,
}, {
  id: 7,
  name: 'Berserk',
  description: 'Every hit increase your DPS by 1%',
  duration: convertMinutesToMs(0.5),
  cost: 3,
  cooldownTimeInMinutes: 3,
  received: false,
}, {
  id: 9,
  name: 'Execution',
  description: 'Instantly killing monster or dealing 50% damage to boss',
  duration: 0,
  cost: 4,
  cooldownTimeInMinutes: 4,
  received: false,
}];
