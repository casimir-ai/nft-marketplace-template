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
          >
            <template #item="{ item }">
              <v-icon> {{ item.icon }} </v-icon>
              <div class="ml-2">
                {{ item.text }}
              </div>
            </template>
            <template #selection="{ item }">
              <v-icon> {{ item.icon }} </v-icon>
              <div class="ml-2">
                {{ item.text }}
              </div>
            </template>
          </v-select>
        </template>
      </vex-section-title>

      <nft-items-infinite-scroll
        :sort="sort"
        :filter="{ status: NFT_ITEM_METADATA_DRAFT_STATUS.APPROVED }"
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
              <asset-card :asset="asset" is-draft />
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
  import { NFT_ITEM_METADATA_DRAFT_STATUS } from '@deip/constants';

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
        NFT_ITEM_METADATA_DRAFT_STATUS,
        sort: {},
        sortingOptions: [
          {
            text: this.$t('marketplace.assetList.byDefault'),
            value: null,
            icon: null
          },
          {
            text: this.$t('marketplace.assetList.byName'),
            value: { title: 'asc' },
            icon: 'mdi-sort-alphabetical-ascending'
          },
          {
            text: this.$t('marketplace.assetList.byName'),
            value: { title: 'desc' },
            icon: 'mdi-sort-alphabetical-descending'
          },
          {
            text: this.$t('marketplace.assetList.byPrice'),
            value: { 'metadata.price.amount': 'asc' },
            icon: 'mdi-sort-numeric-ascending'
          },
          {
            text: this.$t('marketplace.assetList.byPrice'),
            value: { 'metadata.price.amount': 'desc' },
            icon: 'mdi-sort-numeric-descending'
          },
          {
            text: this.$t('marketplace.assetList.byCreationDate'),
            value: { createdAt: 'asc' },
            icon: 'mdi-sort-numeric-ascending'
          },
          {
            text: this.$t('marketplace.assetList.byCreationDate'),
            value: { createdAt: 'desc' },
            icon: 'mdi-sort-numeric-descending'
          }
        ]
      };
    }
  };
</script>
