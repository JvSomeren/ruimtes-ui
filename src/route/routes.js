const Home = (r) => require.ensure([], () => r(require('../pages/Home.vue')), 'base');
const Settings = (r) => require.ensure([], () => r(require('../pages/Settings.vue')), 'base');
const SettingsAdmins = (r) => require.ensure([], () => r(require('../pages/Settings/Admins.vue')), 'base');
const SettingsDashboard = (r) => require.ensure([], () => r(require('../pages/Settings/Dashboard.vue')), 'base');
const SettingsRequests = (r) => require.ensure([], () => r(require('../pages/Settings/Requests.vue')), 'base');
const SettingsResources = (r) => require.ensure([], () => r(require('../pages/Settings/Resources.vue')), 'base');

const main = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    children: [
      { path: '', component: SettingsDashboard },
      { path: 'admins', component: SettingsAdmins },
      { path: 'requests', component: SettingsRequests },
      { path: 'resources', component: SettingsResources },
    ]
  }
];

export default main;
