<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.assetList.allNfts')"
      >
        <template #append>
          <v-select
            v-model="sort"
            :label="$t('marketplace.assetList.sorting')"
            :items="sortingOptions"
          />
        </template>
      </vex-section-title>

      <nft-items-infinite-scroll
        :sort="sort"
        :filter="{ status: PROJECT_CONTENT_DRAFT_STATUS.APPROVED }"
        is-draft
      >
        <template #default="{ list }">
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-lg="4"
          >
            <router-link
              v-for="asset in list"
              :key="asset._id"
              :to="{name: 'assetDetails', params: {id: asset._id}}"
              class="text-decoration-none"
            >
              <asset-card :content="asset" is-draft />
            </router-link>
          </ve-auto-grid>
        </template>
      </nft-items-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack, VeAutoGrid } from '@deip/vue-elements';
  import { AssetCard } from '@/components';
  import { NftItemsInfiniteScroll } from '@deip/project-content-module';
  import { PROJECT_CONTENT_DRAFT_STATUS } from '@deip/constants';

  export default {
    name: 'AssetList',

    components: {
      AssetCard,
      VexSection,
      VexSectionTitle,
      VeStack,
      VeAutoGrid,
      NftItemsInfiniteScroll
    },

    data() {
      return {
        loading: false,
        PROJECT_CONTENT_DRAFT_STATUS,
        sort: {},
        sortingOptions: [
          {
            text: this.$t('marketplace.assetList.byDefault'),
            value: null
          },
          {
            text: this.$t('marketplace.assetList.byNameAsc'),
            value: { title: 'asc' }
          },
          {
            text: this.$t('marketplace.assetList.byNameDesc'),
            value: { title: 'desc' }
          },
          {
            text: this.$t('marketplace.assetList.byPriceAsc'),
            value: { 'metadata.price.amount': 'asc' }
          },
          {
            text: this.$t('marketplace.assetList.byPriceDesc'),
            value: { 'metadata.price.amount': 'desc' }
          },
          {
            text: this.$t('marketplace.assetList.byCreationDateAsc'),
            value: { createdAt: 'asc' }
          },
          {
            text: this.$t('marketplace.assetList.byCreationDateDesc'),
            value: { createdAt: 'desc' }
          }
        ]
      };
    }

  };
</script>
