<template>
  <nft-collection-form
    ref="nftCollectionForm"
    :schema="$layouts.getMappedData('nftCollection.form').value"
    :submit-label="$t('components.collectionCreateDialog.checkout')"
    @success="handleSuccess"
    @error="handleError"
    @cancel="handleCancel"
  >
    <template #nftCollectionInfo>
      <ve-stack class="d-flex flex-column text-h6 mb-6" :gap="24">
        <div class="d-flex justify-space-between align-center">
          <div>
            {{ $t('components.collectionCreateDialog.balance') }}
          </div>
          <div>
            153.75 {{ defaultFungibleToken.symbol }}
          </div>
        </div>
        <div class="d-flex justify-space-between align-center">
          <div>
            {{ $t('components.collectionCreateDialog.serviceFee') }}
          </div>
          <div>
            2.50 {{ defaultFungibleToken.symbol }}
          </div>
        </div>
      </ve-stack>
      <v-divider />
      <div class="d-flex justify-space-between align-center text-h6 mt-6 mb-6">
        <div>
          {{ $t('components.collectionCreateDialog.total') }}
        </div>
        <div class="text-h4">
          56.00 {{ defaultFungibleToken.symbol }}
        </div>
      </div>
    </template>
  </nft-collection-form>
</template>

<script>
  import { VeStack } from '@deip/vue-elements';
  import { NftCollectionForm } from '@casimir/nft-collections-module';

  export default {
    name: 'AssetCreateForm',

    components: {
      VeStack,
      NftCollectionForm
    },

    data() {
      return {
        loading: false,
        title: null
      };
    },

    computed: {
      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      }
    },

    methods: {
      handleSuccess() {
        this.$notifier.showSuccess(this.$t('components.collectionCreateDialog.createSuccess'));
        this.reloadNftCollection();
        this.$emit('close-dialog');
      },
      handleError(error) {
        this.reloadNftCollection();
        this.$notifier.showError(error);
      },
      handleCancel() {
        this.$emit('close-dialog');
      },
      clearForm() {
        this.$refs.nftCollectionForm.clearForm();
      },
      async reloadNftCollection() {
        await this.$store.dispatch('getCurrentUserNftCollection');
      }
    }

  };
</script>
