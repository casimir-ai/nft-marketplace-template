<template>
  <vex-section>
    <ve-stack>
      <assets-infinite-scroll :filter="filter">
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
              />
            </v-col>
          </v-row>
        </template>
      </assets-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { AssetCard } from '@/components';
  import { AssetsInfiniteScroll } from '@/components/AssetsInfiniteScroll';

  export default {
    name: 'SoldAssets',
    components: {
      AssetCard,
      VexSection,
      VeStack,
      AssetsInfiniteScroll
    },
    data() {
      return {
        loading: false,
        filter: {
          authors: this.$currentUser._id
        }
      };
    }
  };
</script>
