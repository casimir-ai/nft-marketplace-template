<template>
  <ve-stack class="ml-6 mt-7 mb-7">
    <div
      v-for="asset of assets"
      :key="asset._id"
      class="d-flex align-center"
    >
      <img
        src="@/assets/usdt.svg"
        height="36"
        width="36"
        alt=""
      >
      <div class="ml-6 d-flex flex-column justify-center">
        <div class="text-subtitle-2">
          {{ asset.price }} wUSDT
        </div>
        <div class="text-body-1 grey--text text--lighten-1">
          {{ asset.priceInDeip }} DEIP
        </div>
      </div>
    </div>
  </ve-stack>
</template>

<script>
  import { VeStack } from '@deip/vue-elements';

  export default {
    name: 'Assets',
    components: {
      VeStack
    },
    data() {
      return {
        assets: [
          {
            _id: 1,
            price: 75.30,
            priceInDeip: 74
          },
          {
            _id: 2,
            price: 75.30,
            priceInDeip: 74
          }
        ]
      };
    }

  };
</script>
