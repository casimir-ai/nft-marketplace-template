<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.assetList.allNfts')"
      >
        <template #append>
          <v-select
            :label="$t('marketplace.assetList.sorting')"
            :items="sortingOptions"
          />
        </template>
      </vex-section-title>

      <v-row>
        <v-col
          v-for="content in contentList"
          :key="content._id"
          cols="12"
          md="6"
          lg="3"
        >
          <router-link
            :to="{name: 'assetDetails', params: {id: content._id}}"
            class="text-decoration-none"
          >
            <asset-card :content="content" />
          </router-link>
        </v-col>
      </v-row>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { AssetCard } from '@/components';

  export default {
    name: 'AssetList',

    components: {
      AssetCard,
      VexSection,
      VexSectionTitle,
      VeStack
    },

    data() {
      return {
        loading: false,
        sortingOptions: [
          {
            text: this.$t('marketplace.assetList.byDefault'),
            value: 'default'
          },
          {
            text: this.$t('marketplace.assetList.byName'),
            value: 'name'
          },
          {
            text: this.$t('marketplace.assetList.byPrice'),
            value: 'price'
          }
        ]
      };
    },

    computed: {
      contentList() {
        return this.$store.getters['projectContent/list']({ formatType: 2 });
      }
    },

    created() {
      this.getList();
    },

    methods: {
      async getList() {
        try {
          this.loading = true;
          await this.$store.dispatch('projectContent/getList');
          const authorIds = this.contentList.map((content) => content.authors[0]);
          const uniqueAuthorIds = Array.from(new Set(authorIds));
          await this.$store.dispatch('users/getList', uniqueAuthorIds);
          this.loading = false;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
</script>
