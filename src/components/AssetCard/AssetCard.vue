<template>
  <div>
    <v-card
      outlined
      class="nft-card"
      @click="onCardClick"
    >
      <v-img
        height="230"
        aspect-ratio="1.3"
        :src="assetUrl"
      >
        <div v-if="isDraft" class="button-container d-flex justify-end mt-4 mr-4">
          <nw-btn
            icon
            small
            kind="secondary"
            class="white"
            :title="$t('components.assetCard.copyLink')"
            @click.prevent="handleCopyLinkClick"
          >
            <v-icon>mdi-link</v-icon>
          </nw-btn>
        </div>
      </v-img>
      <v-card-text class="grey--text text--darken-4">
        <ve-stack :gap="32">
          <ve-stack :gap="4">
            <div class="text-h6">
              {{ assetData.title }}
            </div>
            <div v-if="!assetData.metadata.publishAnonymously && creator" class="text-subtitle-3">
              {{ creator }}
            </div>
            <div class="text-body-1 grey--text text--lighten-2">
              {{ $$formatDate($$parseISO(assetData.createdAt), 'PP') }}
            </div>
          </ve-stack>

          <div class="purchase-container d-flex justify-space-between align-center">
            <div class="price-container">
              <span class="text-h3">{{ assetData.metadata.price.amount }} </span>
              <span class="text-subtitle-3 grey--text text--lighten-2">
                {{ assetData.metadata.price.symbol }}
              </span>
            </div>

            <div v-if="assetData.status">
              <v-chip outlined>
                {{ getStatusLabel(assetData.status) }}
              </v-chip>
            </div>
          </div>
        </ve-stack>
      </v-card-text>
    </v-card>
    <asset-details
      v-if="addAssetsDetailsModal && isAssetDetailsDialogOpen"
      :id="assetData._id"
      v-model="isAssetDetailsDialogOpen"
      :is-draft="isDraft"
    />
  </div>
</template>

<script>
  import { NFT_ITEM_METADATA_DRAFT_STATUS } from '@deip/constants';
  import { dateMixin } from '@deip/platform-components';
  import { VeStack } from '@deip/vue-elements';
  import { NonFungibleTokenService } from '@casimir/token-service';

  import { NwBtn } from '@/components/NwBtn';
  import { AssetDetails } from '@/modules/marketplace/components/AssetDetails';

  const nonFungibleTokenService = NonFungibleTokenService.getInstance();

  export default {
    name: 'AssetCard',

    components: {
      VeStack,
      NwBtn,
      AssetDetails
    },

    mixins: [dateMixin],

    props: {
      asset: {
        type: Object,
        required: true
      },
      addAssetsDetailsModal: {
        type: Boolean,
        default: false
      },
      isDraft: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        NFT_ITEM_METADATA_DRAFT_STATUS,
        isAssetDetailsDialogOpen: false
      };
    },

    computed: {
      assetData() {
        return (this.isDraft) ? this.asset : this.asset.metadata;
      },

      assetUrl() {
        const { nftCollectionId, _id, packageFiles: [{ hash }] } = this.assetData;
        const itemId = _id.nftItemId || _id;

        return nonFungibleTokenService.getNftItemFileSrc(nftCollectionId, itemId, hash);
      },

      isCurrentUserAuthor() {
        return this.assetData.authors.includes(this.$currentUser._id);
      },

      creator() {
        const userData = this.$store.getters['users/one'](this.assetData.authors[0]);

        if (!userData?.attributes) return null;

        return this.$attributes
          .getMappedData('user.name', userData.attributes)?.value;
      }
    },

    methods: {
      handleCopyLinkClick() {
        const props = this.$router.resolve({
          name: 'assetDetails',
          params: { id: this.assetData._id }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

      onCardClick() {
        this.isAssetDetailsDialogOpen = true;
      },

      getStatusLabel(status) {
        return this.$t(`components.assetCard.status.${NFT_ITEM_METADATA_DRAFT_STATUS[status]}`);
      }
    }

  };
</script>
