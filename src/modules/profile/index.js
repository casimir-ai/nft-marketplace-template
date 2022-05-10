import { profileRouter } from '@/modules/profile/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of profileRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NoWarProfileModule]: router instance is not provided');
  }
};

export const NoWarProfileModule = {
  name: 'NoWarProfileModule',
  deps: [
    'EnvModule',
    'UsersModule'
  ],
  install
};
