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

      <assets-infinite-scroll :sort="sort">
        <template #default="{ assets }">
          <v-row>
            <v-col
              v-for="asset in assets"
              :key="asset._id"
              cols="12"
              md="6"
              lg="3"
            >
              <router-link
                :to="{name: 'assetDetails', params: {id: asset._id}}"
                class="text-decoration-none"
              >
                <asset-card :content="asset" />
              </router-link>
            </v-col>
          </v-row>
        </template>
      </assets-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { AssetCard } from '@/components';
  import { AssetsInfiniteScroll } from '@/components/AssetsInfiniteScroll';

  export default {
    name: 'AssetList',

    components: {
      AssetCard,
      VexSection,
      VexSectionTitle,
      VeStack,
      AssetsInfiniteScroll
    },

    data() {
      return {
        loading: false,
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
