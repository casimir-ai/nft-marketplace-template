<template>
  <vex-block>
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
  </vex-block>
</template>

<script>
  import { VexBlock } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  export default {
    name: 'CollectionFormInfo',

    components: {
      VexBlock,
      VeStack

    },

    computed: {
      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      }
    }
  };
</script>
