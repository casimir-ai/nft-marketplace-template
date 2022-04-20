import { authRouter } from '@/modules/auth/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of authRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NoWarAuthModule]: router instance is not provided');
  }
};

export const NoWarAuthModule = {
  name: 'NoWarAuthModule',
  deps: [
    'EnvModule',
    'AuthModule'
  ],
  install
};
