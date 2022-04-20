import Vue from 'vue';
import VueRouter from 'vue-router';
import qs from 'qs';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'nftList'
    }
  }
];

const router = new VueRouter({
  routes,

  parseQuery(query) {
    return qs.parse(query);
  },

  stringifyQuery(query) {
    const result = qs.stringify(query);

    return result ? (`?${result}`) : '';
  }
});

export default router;
