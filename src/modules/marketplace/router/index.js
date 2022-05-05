import { SYSTEM_ROLE } from '@deip/constants';
import { AssetList } from '../components/AssetList';
import { AssetCreateDialog } from '../components/AssetCreateDialog';
import { AssetDetails } from '../components/AssetDetails';

export const marketplaceRouter = [
  {
    path: '/',
    component: { template: '<div><router-view name="dialog"/><router-view /></div>' },
    meta: { auth: false },
    children: [
      {
        name: 'marketplace',
        path: '',
        component: AssetList,
        meta: { auth: false }
      },
      {
        name: 'assetDetails',
        path: 'asset/:id',
        components: {
          default: AssetList,
          dialog: AssetDetails
        },
        meta: { auth: false },
        props: {
          dialog: (route) => ({
            value: true,
            id: route.params.id,
            mainRoute: { name: 'marketplace' }
          })
        }
      },
      {
        name: 'createAsset',
        path: 'asset/create',
        components: {
          default: AssetList,
          dialog: AssetCreateDialog
        },
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: {
          dialog: {
            value: true,
            mainRoute: { name: 'marketplace' }
          }
        }
      }
    ]
  }
];
