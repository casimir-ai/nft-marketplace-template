import { SYSTEM_ROLE } from '@deip/auth-module';

import { ModerationPage } from '../components/ModerationPage';

export const moderationRouter = [
  {
    name: 'moderation',
    path: '/moderation',
    component: ModerationPage,
    meta: {
      auth: [SYSTEM_ROLE.ANY]
    }
  }
];
