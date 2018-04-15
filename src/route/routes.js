const Home = (r) => require.ensure([], () => r(require('../pages/Home.vue')), 'base');

const main = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
];

export default main;
