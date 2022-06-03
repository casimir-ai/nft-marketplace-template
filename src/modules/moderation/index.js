import { moderationRouter } from '@/modules/moderation/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of moderationRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NoWarModerationModule]: router instance is not provided');
  }
};

export const NoWarModerationModule = {
  name: 'NoWarModerationModule',
  deps: [
    'EnvModule',
    'AuthModule',
    'ProjectContentModule'
  ],
  install
};
