import { SYSTEM_ROLE } from '@deip/auth-module';

import { routerView } from '@deip/platform-util';

import { Profile } from '@/modules/profile/components/Profile';
import { EditProfile } from '@/modules/profile/components/EditProfile';

export const profileRouter = [
  {
    path: '/profile',
    component: routerView,
    meta: {
      auth: [SYSTEM_ROLE.ANY]
    },
    children: [
      {
        path: 'details',
        name: 'profile.details',
        component: Profile,
        meta: {
          auth: [SYSTEM_ROLE.ANY]
        }
      },
      {
        path: 'edit',
        name: 'profile.edit',
        component: EditProfile,
        meta: {
          auth: [SYSTEM_ROLE.ANY]
        }
      }
    ]
  }
];
