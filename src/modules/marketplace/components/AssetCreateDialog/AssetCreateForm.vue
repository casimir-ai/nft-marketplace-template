<template>
  <validation-observer
    v-slot="{ invalid, handleSubmit }"
    ref="validationObserver"
  >
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(submit)"
    >
      <ve-stack>
        <ve-stack class="fields-container">
          <ve-stack
            :gap="16"
            flow="row"
            flow-sm="column"
            template-columns="1fr"
            template-columns-sm="1fr 1fr"
          >
            <ve-stack
              :gap="8"
              flow="row"
              flow-sm="row"
              template-columns="auto"
              template-columns-sm="auto"
            >
              <validation-provider
                v-slot="{ errors }"
                :name="$t('marketplace.createAsset.name')"
                rules="required"
              >
                <v-text-field
                  v-model="formData.name"
                  :label="$t('marketplace.createAsset.name')"
                  :error-messages="errors"
                  hide-details="auto"
                />
              </validation-provider>

              <validation-provider v-slot="{ errors }">
                <v-textarea
                  v-model="formData.description"
                  :label="$t('marketplace.createAsset.description')
                    + ' (' + $t('marketplace.createAsset.optional') + ')'"
                  :error-messages="errors"
                  hide-details="auto"
                  no-resize
                  rows="4"
                  :disabled="loading"
                />
              </validation-provider>
            </ve-stack>

            <validation-provider
              v-slot="{ errors }"
              :name="$t('marketplace.createAsset.uploadFile')"
              :rules="{required: true, size: 204800}"
            >
              <vex-image-input
                v-model="formData.image"
                :error-messages="errors"
                disable-crop
                hide-details="auto"
                :aspect-ratio="3/2"
              />
            </validation-provider>
          </ve-stack>

          <div>
            <div class="text-h6 mb-3">
              {{ $t('marketplace.createAsset.setThePrice') }}
            </div>
            <validation-provider
              v-slot="{ errors }"
              :name="$t('marketplace.createAsset.price')"
              rules="required"
            >
              <price-selector
                v-model="formData.price"
                :disabled="loading"
                :error-messages="errors"
              />
            </validation-provider>
          </div>

          <div>
            <v-checkbox
              v-model="formData.publishAnonymously"
              :label="$t('marketplace.createAsset.publishAnonymouslyMessage')"
              hide-details="auto"
              class="ma-0 pa-0"
            />

            <validation-provider
              v-slot="{ errors }"
              name=" "
              :rules="{ required: { allowFalse: false } }"
            >
              <v-checkbox
                v-model="formData.confirmDonate"
                :label="$t('marketplace.createAsset.fundsMessage')"
                :error-messages="errors"
                hide-details="auto"
                class="pa-0"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name=" "
              :rules="{ required: { allowFalse: false } }"
            >
              <v-checkbox
                v-model="formData.confirmModeration"
                :label="$t('marketplace.createAsset.moderationMessage')"
                :error-messages="errors"
                hide-details="auto"
                class="pa-0"
              />
            </validation-provider>
          </div>
        </ve-stack>

        <div class="buttons-container ml-auto">
          <nw-btn
            kind="primary"
            :disabled="invalid"
            :loading="loading"
            type="submit"
          >
            {{ $t('marketplace.createAsset.createNft') }}
          </nw-btn>
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>
  import { VeStack } from '@deip/vue-elements';
  import { VexImageInput } from '@deip/vuetify-extended';
  import { NFT_ITEM_METADATA_FORMAT, NFT_ITEM_METADATA_DRAFT_STATUS } from '@deip/constants';
  import { NwBtn } from '@/components/NwBtn';
  import PriceSelector from './PriceSelector';

  const defaultFormData = () => ({
    name: null,
    description: null,
    image: null,
    price: null,
    publishAnonymously: false,
    confirmDonate: null,
    confirmModeration: null
  });

  export default {
    name: 'AssetCreateForm',

    components: {
      VeStack,
      VexImageInput,
      NwBtn,
      PriceSelector
    },

    data() {
      return {
        loading: false,
        formData: defaultFormData()
      };
    },

    computed: {
      nftCollection() {
        return this.$store.getters.userNftCollection;
      },
      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      }
    },

    methods: {
      async submit() {
        this.loading = true;
        await this.createAsset();
        this.loading = false;
      },

      clearForm() {
        this.formData = defaultFormData();
        this.$refs.validationObserver.reset();
      },

      async createAsset() {
        if (!this.nftCollection) {
          this.$notifier.showError(this.$t('marketplace.createAsset.errors.noNftCollection'));
          return;
        }

        try {
          const {
            nftItemMetadataDraftModerationRequired = false
          } = this.$currentPortal?.profile?.settings?.moderation || {};
          const status = nftItemMetadataDraftModerationRequired
            ? NFT_ITEM_METADATA_DRAFT_STATUS.APPROVED
            : NFT_ITEM_METADATA_DRAFT_STATUS.PROPOSED;

          const draftPayload = {
            data: {
              owner: this.$currentUser._id,
              ownedByTeam: false,
              nftCollectionId: this.nftCollection._id,
              title: this.formData.name,
              authors: [this.$currentUser.username],
              formatType: NFT_ITEM_METADATA_FORMAT.PACKAGE,
              files: [this.formData.image],
              status,
              metadata: {
                description: this.formData.description,
                price: {
                  id: this.defaultFungibleToken._id,
                  symbol: this.defaultFungibleToken.symbol,
                  precision: this.defaultFungibleToken.precision,
                  amount: this.formData.price
                },
                publishAnonymously: this.formData.publishAnonymously
              }
            }
          };

          await this.$store.dispatch('projectContentDrafts/create', draftPayload);

          this.$notifier.showSuccess(this.$t('marketplace.createAsset.createSuccess'));
          this.$emit('success');
        } catch (error) {
          console.error(error.error || error);
          const errorText = error.statusCode === 409
            ? this.$t('marketplace.createAsset.errors.duplicate') : error.error.message;
          this.$notifier.showError(errorText);
        }
      }
    }
  };
</script>
