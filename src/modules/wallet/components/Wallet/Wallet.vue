<template>
  <v-sheet
    min-height="calc(100vh - 56px)"
    class="d-flex flex-column align-center justify-center pa-16 transparent"
  >
    <v-card
      outlined
      max-width="857"
      min-height="495"
      width="100%"
    >
      <div class="d-flex align-center justify-center mt-6">
        <h4 class="text-h4">
          {{ $t('wallet.title') }}
        </h4>
      </div>
      <div class="d-flex align-center justify-center mt-2 ">
        <div class="text-body-1 mr-2 grey--text text--lighten-1">
          {{ walletAddress }}
        </div>
        <nw-btn
          icon
          small
          kind="secondary"
          width="24"
          height="24"
          :title="$t('wallet.copy')"
          @click="handleCopyWalletAddressClick"
        >
          <v-icon size="16">
            mdi-content-copy
          </v-icon>
        </nw-btn>
      </div>
      <v-divider class="mt-11" />
      <nw-btn
        icon
        large
        kind="secondary"
        class="usdt-icon"
        disabled
      >
        <img
          src="@/assets/usdt.svg"
          height="36"
          width="36"
          alt=""
        >
      </nw-btn>
      <div class="d-flex flex-column align-center justify-center mt-6">
        <h3 class="text-h3">
          950.00 wUSDT
        </h3>
        <div class="text-body-1 mt-2 grey--text text--lighten-1">
          (~250.00 DEIP)
        </div>
        <nw-btn
          small
          kind="secondary"
          class="mt-6 mb-6"
        >
          {{ $t('wallet.depositButton') }}
        </nw-btn>
      </div>

      <v-tabs
        background-color="transparent"
        grow
      >
        <v-tab>
          {{ $t('wallet.assets') }}
        </v-tab>
        <v-tab>
          {{ $t('wallet.transactions') }}
        </v-tab>

        <v-tab-item>
          <assets />
        </v-tab-item>
        <v-tab-item>
          <transactions />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-sheet>
</template>

<script>
  import { NwBtn } from '@/components/NwBtn';
  import { Assets } from '@/modules/wallet/components/Assets';
  import { Transactions } from '@/modules/wallet/components/Transactions';

  export default {
    name: 'Wallet',
    components: {
      NwBtn,
      Assets,
      Transactions
    },

    computed: {
      walletAddress() {
        return this.$currentUser.profile.address;
      }
    },

    methods: {
      handleCopyWalletAddressClick() {
        navigator.clipboard.writeText(this.walletAddress);
        this.$notifier.showSuccess(this.$t('wallet.copyWalletAddressSuccess'));
      }
    }

  };
</script>

<style lang="scss" scoped>

.v-slide-group__wrapper{
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.usdt-icon {
  background-color: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: -1.8em;
}

</style>
