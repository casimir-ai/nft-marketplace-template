import { SYSTEM_ROLE } from '@casimir/platform-core';

import { Wallet } from '@/modules/wallet/components/Wallet';
import { Transactions } from '@/modules/wallet/components/Transactions';
import { Assets } from '@/modules/wallet/components/Assets';

export const walletRouter = [
  {
    path: '/wallet',
    name: 'wallet',
    component: Wallet,
    meta: {
      auth: [SYSTEM_ROLE.ANY]
    },
    children: [
      {
        path: 'assets',
        name: 'wallet.assets',
        component: Assets,
        meta: {
          auth: [SYSTEM_ROLE.ANY]
        }
      },
      {
        path: 'transactions',
        name: 'wallet.transactions',
        component: Transactions,
        meta: {
          auth: [SYSTEM_ROLE.ANY]
        }
      }
    ]
  }
];
