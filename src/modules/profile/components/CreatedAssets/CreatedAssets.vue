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

      <assets-infinite-scroll :filter="filter" is-draft>
        <template #default="{ assets }">
          <v-row>
            <v-col
              v-for="asset in assets"
              :key="asset._id"
              cols="12"
              md="6"
              lg="3"
            >
              <asset-card
                :content="asset"
                add-assets-details-modal
                is-draft
              />
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
  import { AssetsInfiniteScroll } from '@/components/AssetsInfiniteScroll';
  import { PROJECT_CONTENT_DRAFT_STATUS } from '@deip/constants';
  import { AssetCard } from '@/components';

  export default {
    name: 'CreatedAssets',
    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      AssetCard,
      AssetsInfiniteScroll
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
            status: PROJECT_CONTENT_DRAFT_STATUS.IN_PROGRESS,
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.declined'),
          value: {
            status: PROJECT_CONTENT_DRAFT_STATUS.REJECTED,
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.approved'),
          value: {
            status: PROJECT_CONTENT_DRAFT_STATUS.APPROVED,
            ...filter
          }
        }

      ];

      return {
        loading: false,
        filter,
        filterOptions
      };
    }
  };
</script>
