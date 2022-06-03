<template>
  <assets-infinite-scroll
    v-slot="{assets}"
    :filter="filter"
    is-draft
    class="py-6"
  >
    <ve-auto-grid
      cols="1"
      cols-sm="2"
      cols-lg="4"
    >
      <moderation-asset-card
        v-for="asset in assets"
        :key="asset._id"
        :asset="asset"
      />
    </ve-auto-grid>
  </assets-infinite-scroll>
</template>

<script>
  import { PROJECT_CONTENT_DRAFT_STATUS } from '@deip/constants';
  import { ModerationAssetCard } from '@/modules/moderation/components/ModerationAssetCard';
  import { AssetsInfiniteScroll } from '@/components/AssetsInfiniteScroll';
  import { VeAutoGrid } from '@deip/vue-elements';

  export default {
    name: 'PendingAssetsList',

    components: {
      ModerationAssetCard,
      AssetsInfiniteScroll,
      VeAutoGrid
    },

    data() {
      return {
        filter: {
          status: PROJECT_CONTENT_DRAFT_STATUS.PROPOSED
        }
      };
    }
  };
</script>
