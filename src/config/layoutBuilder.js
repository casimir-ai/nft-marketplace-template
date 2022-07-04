import { blocksGenerator } from '@deip/vue-layout-schema';

import CollectionFormInfo from '@/components/CollectionCreateDialog/CollectionFormInfo';

export const layoutBuilderElements = {
  blocks: [
    {
      title: 'Components',
      blocks: [
        ...blocksGenerator([
          {
            component: CollectionFormInfo,
            icon: 'mdi-folder-information',
            blockType: 'simple',
            layoutType: 'form',
            scope: ['nftCollection']
          }
        ])
      ]
    }
  ],
  components: {
    CollectionFormInfo
  }
};
