import { walletRouter } from '@/modules/wallet/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of walletRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NoWarWalletModule]: router instance is not provided');
  }
};

export const NoWarWalletModule = {
  name: 'NoWarWalletModule',
  deps: [
    'EnvModule'
  ],
  install
};
