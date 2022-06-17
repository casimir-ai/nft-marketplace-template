<template>
  <div v-if="asset">
    <nw-dialog
      v-model="isDialogOpen"
      persistent
      :max-width="maxWidth"
      max-content-height="600"
    >
      <template v-if="!completeCheckout" #aside>
        <vex-image
          height="500"
          :min-width="minImageWidth"
          content-class="responsive-image"
          full-view
          :src="assetUrl"
        />
      </template>
      <template #title>
        <div>
          <nw-btn
            v-if="completeCheckout"
            kind="tetriary"
            small
            @click="handleBackClick"
          >
            <v-icon
              left
              dark
            >
              mdi-chevron-left
            </v-icon>
            {{ $t('marketplace.assetDetails.backButton') }}
          </nw-btn>
          <div>
            {{ title }}
          </div>
        </div>
      </template>
      <template v-if="!completeCheckout" #titleButtons>
        <nw-btn
          small
          icon
          kind="secondary"
          @click="handleCopyLinkClick"
        >
          <v-icon>mdi-share-variant</v-icon>
        </nw-btn>
      </template>
      <div v-if="!completeCheckout" class="asset-container mb-3">
        <div>
          {{ asset.metadata.description }}
        </div>

        <v-row no-gutters class="mt-8">
          <v-col cols="12" md="6">
            <div class="mb-9">
              <div class="text-body-1 grey--text text--lighten-2">
                {{ $t('marketplace.assetDetails.creator') }}
              </div>
              <div v-if="!asset.metadata.publishAnonymously && creator" class="text-subtitle-2">
                {{ creator }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mb-9">
              <div class="text-body-1 grey--text text--lighten-2">
                {{ $t('marketplace.assetDetails.created') }}
              </div>
              <div class="text-subtitle-2">
                {{ $$formatDate($$parseISO(asset.createdAt), 'PP') }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mb-9">
              <div class="text-body-1 grey--text text--lighten-2">
                {{ $t('marketplace.assetDetails.price') }}
              </div>
              <div>
                <span class="text-subtitle-1">{{ asset.metadata.price.amount }} </span>
                <span class="text-body-1 grey--text text--lighten-2">
                  {{ asset.metadata.price.symbol }}
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="$isUser && !isCurrentUserAuthor && !completeCheckout"
        class="d-flex justify-end"
      >
        <nw-btn
          kind="primary"
          @click="handleSupportClick"
        >
          {{ $t('marketplace.assetDetails.support') }}
        </nw-btn>
      </div>
      <complete-checkout
        v-if="completeCheckout"
        :asset="asset"
        :creator-name="creator"
        :asset-url="assetUrl"
      />
    </nw-dialog>
  </div>
</template>

<script>
  import { dateMixin } from '@deip/platform-components';
  import { userHelpersMixin } from '@deip/users-module';
  import { VexImage } from '@deip/vuetify-extended';
  import { NonFungibleTokenService } from '@casimir/token-service';
  import { NwDialog, NwBtn } from '@/components';
  import CompleteCheckout from './CompleteCheckout';

  const nonFungibleTokenService = NonFungibleTokenService.getInstance();

  export default {
    name: 'AssetDetails',

    components: {
      NwDialog,
      NwBtn,
      CompleteCheckout,
      VexImage
    },

    mixins: [dateMixin, userHelpersMixin],

    props: {
      value: {
        type: Boolean,
        default: true
      },
      id: {
        type: String,
        required: true
      },
      mainRoute: {
        type: Object,
        default: null
      },
      isDraft: {
        type: Boolean,
        default: false
      }

    },

    data() {
      return {
        loading: false,
        completeCheckout: false,
        showBackButton: false
      };
    },

    computed: {
      title() {
        return this.completeCheckout ? this.$t('marketplace.assetDetails.completeCheckout')
          : this.asset.title;
      },

      asset() {
        return (this.isDraft)
          ? this.$store.getters['projectContentDrafts/one'](this.id)
          : this.$store.getters['projectContent/one'](this.id);
      },

      assetUrl() {
        const { nftCollectionId, _id, packageFiles: [{ hash }] } = this.asset;
        const itemId = _id.nftItemId || _id;

        return nonFungibleTokenService.getNftItemFileSrc(nftCollectionId, itemId, hash);
      },

      creator() {
        const userData = this.$store.getters['users/one'](this.asset.authors[0]);

        if (!userData?.attributes) return null;

        return this.$attributes
          .getMappedData('user.name', userData.attributes)?.value;
      },

      isCurrentUserAuthor() {
        return this.asset.authors.includes(this.$currentUser._id);
      },

      maxWidth() {
        return this.completeCheckout ? '638' : '1100';
      },

      minImageWidth() {
        return this.$vuetify.breakpoint.xs ? null : '500';
      },

      isDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
          if (!value) {
            this.closeDialog();
          }
        }
      }
    },

    created() {
      this.getData();
    },

    methods: {
      closeDialog() {
        if (!this.mainRoute) {
          this.$emit('close');
        } else {
          this.$router.push(this.mainRoute);
        }
      },

      async getData() {
        try {
          if (this.isDraft) await this.$store.dispatch('projectContentDrafts/getOne', this.id);
          else await this.$store.dispatch('projectContent/getOne', this.id);
          await this.$store.dispatch('users/getOne', this.asset.authors[0]);
        } catch (error) {
          console.error(error);
        }
      },

      handleCopyLinkClick() {
        const props = this.$router.resolve({
          name: 'assetDetails',
          params: { id: this.asset._id }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

      handleSupportClick() {
        this.completeCheckout = true;
      },

      handleBackClick() {
        this.completeCheckout = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  .asset-container {
    word-break: break-all;
  }
</style>

<style  lang="scss">
  .responsive-image {
    width: 100% !important;
  }
</style>
