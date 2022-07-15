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
        <layout-renderer
          v-if="formSchema"
          v-model="formData"
          :schema="formSchema"
          :schema-data="schemaData"
        />

        <validation-provider
          v-slot="{ errors }"
          :name="$t('marketplace.createAsset.donation')"
          :rules="{ required: { allowFalse: false } }"
        >
          <v-checkbox
            v-model="confirmations.confirmDonate"
            :label="$t('marketplace.createAsset.fundsMessage')"
            :error-messages="errors"
            hide-details="auto"
            class="pa-0"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          :name="$t('marketplace.createAsset.moderation')"
          :rules="{ required: { allowFalse: false } }"
        >
          <v-checkbox
            v-model="confirmations.confirmModeration"
            :label="$t('marketplace.createAsset.moderationMessage')"
            :error-messages="errors"
            hide-details="auto"
            class="pa-0"
          />
        </validation-provider>

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
  import { attributedFormFactory, LayoutRenderer } from '@deip/layouts-module';
  import { VeStack } from '@deip/vue-elements';
  import { NftItemMetadataDraftStatus, AttributeScope } from '@casimir/platform-core';
  import { NwBtn } from '@/components/NwBtn';

  const defaultConfirmationsData = () => ({
    donate: false,
    moderation: false
  });

  export default {
    name: 'AssetCreateForm',

    components: {
      LayoutRenderer,
      VeStack,
      NwBtn
    },

    mixins: [attributedFormFactory(AttributeScope.NFT_ITEM, 'nftItem')],

    data() {
      return {
        loading: false,
        confirmations: defaultConfirmationsData()
      };
    },

    computed: {
      formSchema() {
        return this.$layouts.getMappedData('nftItem.form')?.value;
      },

      nftCollection() {
        return this.$store.getters.userNftCollection;
      },

      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      }
    },

    mounted() {
      this.clearForm();
      this.reloadNftCollection();
    },

    methods: {
      async reloadNftCollection() {
        await this.$store.dispatch('getCurrentUserNftCollection');
      },

      async submit() {
        this.loading = true;
        await this.createAsset();
        this.loading = false;
      },

      clearForm() {
        this.restoreOldValue(true); // TODO doesn't clean the form

        this.confirmations = defaultConfirmationsData();
        this.$refs.validationObserver.reset();
      },

      async sellLazy() {
        try {
          const { _id, issuer, nextNftItemId } = this.nftCollection;
          const asset = this.$attributes
            .getMappedData('nftItem.price', this.lazyFormData.attributes)?.value;

          const payload = {
            initiator: this.$currentUser,
            data: {
              issuer,
              asset,
              nftCollectionId: _id,
              nftItemId: nextNftItemId
            }
          };

          await this.$store.dispatch('nftItemDrafts/sellLazy', payload);
        } catch (error) {
          console.error(error?.error || error);
        }
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
            ? NftItemMetadataDraftStatus.PROPOSED
            : NftItemMetadataDraftStatus.APPROVED;

          const draftPayload = {
            data: {
              owner: this.$currentUser._id,
              ownedByTeam: false,
              nftCollectionId: this.nftCollection._id,
              nftItemId: this.nftCollection.nextNftItemId,
              authors: [this.$currentUser._id],
              status,
              ...this.lazyFormData
            }
          };

          await this.$store.dispatch('nftItemDrafts/create', draftPayload);

          await this.sellLazy();

          this.reloadNftCollection();

          this.$notifier.showSuccess(this.$t('marketplace.createAsset.createSuccess'));
          this.$emit('success');
          this.$eventBus.$emit('submit-asset');
          this.clearForm();
        } catch (error) {
          console.error(error.error || error);
          const errorText = error.statusCode === 409
            ? this.$t('marketplace.createAsset.errors.duplicate') : error;
          this.$notifier.showError(errorText);
        }
      }
    }
  };
</script>
