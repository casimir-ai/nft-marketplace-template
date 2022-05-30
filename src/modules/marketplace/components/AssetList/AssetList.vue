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
            @change="handleSelectChange"
          />
        </template>
      </vex-section-title>

      <v-row>
        <v-col
          v-for="asset in assetList"
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
      <infinite-loading v-if="assetList.length" @infinite="loadMoreAssets" />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { AssetCard } from '@/components';
  import InfiniteLoading from 'vue-infinite-loading';

  const PAGE_SIZE = 10;

  export default {
    name: 'AssetList',

    components: {
      AssetCard,
      VexSection,
      VexSectionTitle,
      VeStack,
      InfiniteLoading
    },

    data() {
      return {
        loading: false,
        currentPage: 0,
        assetList: [],
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
    },

    created() {
      this.getList(0);
    },

    methods: {
      async getList(page) {
        const query = {
          page,
          pageSize: PAGE_SIZE,
          sort: this.sort
        };
        try {
          this.loading = true;
          const { items } = await this.$store.dispatch('projectContent/getListPaginated', query);
          this.assetList = this.assetList.concat(items);
          const authorIds = this.assetList.map((asset) => asset.authors[0]);
          const uniqueAuthorIds = Array.from(new Set(authorIds));
          await this.$store.dispatch('users/getList', uniqueAuthorIds);
          this.loading = false;
        } catch (error) {
          console.error(error);
        }
      },

      async loadMoreAssets($state) {
        this.currentPage++;
        await this.getList(this.currentPage);
        $state.loaded();
      },

      handleSelectChange() {
        this.currentPage = 0;
        this.assetList = [];
        this.getList(0);
      }
    }
  };
</script>
