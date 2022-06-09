<template>
  <ve-stack class="mt-4">
    <div class="d-flex justify-end">
      <v-select
        v-model="status"
        :label="$t('moderation.reviewedAssets.filter.label')"
        :items="statuses"
        class="status-select"
        hide-details
      />
    </div>

    <nft-items-infinite-scroll
      v-slot="{list}"
      :filter="filter"
      is-draft
    >
      <ve-auto-grid
        cols="1"
        cols-sm="2"
        cols-lg="4"
      >
        <asset-card
          v-for="asset in list"
          :key="asset._id"
          :content="asset"
        />
      </ve-auto-grid>
    </nft-items-infinite-scroll>
  </ve-stack>
</template>

<script>
  import { VeStack, VeAutoGrid } from '@deip/vue-elements';
  import { PROJECT_CONTENT_DRAFT_STATUS } from '@deip/constants';
  import { NftItemsInfiniteScroll } from '@deip/project-content-module';

  import { AssetCard } from '@/components';

  export default {
    name: 'ReviewedAssetsList',

    components: {
      VeStack,
      VeAutoGrid,
      AssetCard,
      NftItemsInfiniteScroll
    },

    data() {
      const statuses = [
        {
          text: this.$t('moderation.reviewedAssets.filter.showAll'),
          value: {
            $in: [PROJECT_CONTENT_DRAFT_STATUS.APPROVED,
                  PROJECT_CONTENT_DRAFT_STATUS.REJECTED]
          }
        },
        {
          text: this.$t('moderation.reviewedAssets.filter.approved'),
          value: PROJECT_CONTENT_DRAFT_STATUS.APPROVED
        },
        {
          text: this.$t('moderation.reviewedAssets.filter.denied'),
          value: PROJECT_CONTENT_DRAFT_STATUS.REJECTED
        }
      ];

      return {
        statuses,
        status: statuses[0].value
      };
    },

    computed: {
      filter() {
        return {
          status: this.status
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .status-select {
    max-width: 200px;
  }
</style>
