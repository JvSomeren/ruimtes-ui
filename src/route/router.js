import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

Vue.use(VueRouter);

/* Enable router*/
let router = new VueRouter({
    mode: 'history',
    base: "/",
    routes
});

export default router;
