<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="d-flex align-center">
        <v-img
          height="52"
          width="52"
          :src="contentUrl"
          class="image mr-6"
        />
        <div>
          <div class="text-h6">
            {{ content.title }}
          </div>
          <div class="text-subtitle-3 grey--text text--lighten-2">
            {{ creatorName }}
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-center">
        <div class="text-subtitle-3">
          {{ content.price }} wUSDT
        </div>
        <div class="body-1 grey--text text--lighten-2">
          (~74.11 DEIP)
        </div>
      </div>
    </div>
    <v-divider />
    <ve-stack class="d-flex flex-column mt-8 text-h6 mb-6" :gap="24">
      <div class="d-flex justify-space-between align-center">
        <div>
          {{ $t('marketplace.assetDetails.balance') }}
        </div>
        <div>
          153.75 wUSDT
        </div>
      </div>
      <div class="d-flex justify-space-between align-center">
        <div>
          {{ $t('marketplace.assetDetails.price') }}
        </div>
        <div>
          53.50 wUSDT
        </div>
      </div>
      <div class="d-flex justify-space-between align-center">
        <div>
          {{ $t('marketplace.assetDetails.serviceFee') }}
        </div>
        <div>
          2.50 wUSDT
        </div>
      </div>
    </ve-stack>
    <v-divider />
    <div class="d-flex justify-space-between align-center text-h6 mt-6 mb-6">
      <div>
        {{ $t('marketplace.assetDetails.total') }}
      </div>
      <div class="text-h4">
        56.00 wUSDT
      </div>
    </div>
    <div class="d-flex justify-end">
      <nw-btn kind="primary" large>
        {{ $t('marketplace.assetDetails.checkout') }}
      </nw-btn>
    </div>
  </div>
</template>

<script>
  import { NwBtn } from '@/components';
  import { VeStack } from '@deip/vue-elements';

  export default {
    name: 'CompleteCheckout',
    components: {
      NwBtn,
      VeStack
    },

    props: {
      content: {
        type: Object,
        required: true
      },
      creatorName: {
        type: String,
        required: true
      },
      contentUrl: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped lang="scss">
  .image {
    border-radius: 4px;
  }

</style>
