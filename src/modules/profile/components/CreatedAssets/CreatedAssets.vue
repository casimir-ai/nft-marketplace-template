<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('profile.createdAssets.allNfts')"
      >
        <template #append>
          <v-select
            v-model="filter"
            :label="$t('profile.createdAssets.filter')"
            :items="filterOptions"
          />
        </template>
      </vex-section-title>

      <nft-items-infinite-scroll ref="scroll" :filter="filter" is-draft>
        <template #default="{ list }">
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-lg="4"
          >
            <asset-card
              v-for="asset in list"
              :key="asset._id"
              :asset="asset"
              add-assets-details-modal
              is-draft
            />
          </ve-auto-grid>
        </template>
      </nft-items-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack, VeAutoGrid } from '@deip/vue-elements';
  import { NftItemsInfiniteScroll } from '@casimir/nft-items-module';
  import { NftItemMetadataDraftStatus } from '@casimir/platform-core';

  import { AssetCard } from '@/components';

  export default {
    name: 'CreatedAssets',
    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      VeAutoGrid,
      NftItemsInfiniteScroll,
      AssetCard
    },
    data() {
      const filter = {
        authors: this.$currentUser._id
      };
      const filterOptions = [
        {
          text: this.$t('profile.createdAssets.showAll'),
          value: {
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.created'),
          value: {
            status: NftItemMetadataDraftStatus.IN_PROGRESS,
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.declined'),
          value: {
            status: NftItemMetadataDraftStatus.REJECTED,
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.approved'),
          value: {
            status: NftItemMetadataDraftStatus.APPROVED,
            ...filter
          }
        }

      ];

      return {
        loading: false,
        filter,
        filterOptions
      };
    },

    mounted() {
      this.$eventBus.$on('submit-asset', this.$refs.scroll.resetInfiniteScroll);
    },

    destroyed() {
      this.$eventBus.$off('submit-asset', this.$refs.scroll.resetInfiniteScroll);
    }
  };
</script>
