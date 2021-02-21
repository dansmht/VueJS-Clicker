import UpdatesPage from '@/views/UpgradesPage.vue';
import AchievementsPage from '@/views/AchievementsPage.vue';
import StatsPage from '@/views/StatsPage.vue';

export default [
  {
    path: '/',
    name: 'Updates',
    component: UpdatesPage,
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: AchievementsPage,
  },
  {
    path: '/stats',
    name: 'Stats',
    component: StatsPage,
  },
];
