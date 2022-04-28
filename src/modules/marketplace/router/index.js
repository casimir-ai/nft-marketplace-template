import { inDevelopmentView } from '@deip/platform-util';

export const marketplaceRouter = [
  {
    path: '/',
    name: 'nftList',
    component: inDevelopmentView,
    meta: {
      auth: false
    }
  }
];
