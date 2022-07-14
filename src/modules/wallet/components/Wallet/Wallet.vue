<template>
  <v-sheet
    :min-height="sheetHeight"
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
          {{ $currentUser.address }}
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

      <span class="usdt-icon">
        <img
          src="@/assets/usdt.svg"
          height="36"
          width="36"
          alt=""
        >
      </span>
      <div class="d-flex flex-column align-center justify-center mt-6">
        <h3 class="text-h3">
          {{ balance }} {{ symbol }}
        </h3>
        <div class="align-center mt-6">
          <nw-btn
            :href="assetsLink"
            target="_blank"
            small
            kind="secondary"
            class="ma-3"
          >
            {{ $t('wallet.assets') }}
          </nw-btn>

          <nw-btn
            :href="transactionsLink"
            target="_blank"
            small
            kind="secondary"
            class="ma-3"
          >
            {{ $t('wallet.transactions') }}
          </nw-btn>
          <nw-btn
            :href="depositLink"
            target="_blank"
            small
            kind="secondary"
            class="ma-3"
          >
            {{ $t('wallet.depositButton') }}
          </nw-btn>
        </div>
      </div>
      <!--      <v-tabs-->
      <!--        background-color="transparent"-->
      <!--        grow-->
      <!--      >-->
      <!--        <v-tab>-->
      <!--          {{ $t('wallet.assets') }}-->
      <!--        </v-tab>-->
      <!--        <v-tab>-->
      <!--          {{ $t('wallet.transactions') }}-->
      <!--        </v-tab>-->

      <!--        <v-tab-item>-->
      <!--          <assets />-->
      <!--        </v-tab-item>-->
      <!--        <v-tab-item>-->
      <!--          <transactions />-->
      <!--        </v-tab-item>-->
      <!--      </v-tabs>-->
    </v-card>
  </v-sheet>
</template>

<script>
  import BigNumber from 'bignumber.js';
  import { NwBtn } from '@/components/NwBtn';

  import { ChainService } from '@deip/chain-service';
  import { APP_BAR_HEIGHT } from '@/constants';

  export default {
    name: 'Wallet',
    components: {
      NwBtn
    },

    data() {
      return {
        balance: '',
        transactionsLink: `${this.$env.WALLET_URL}/transactions`,
        depositLink: `${this.$env.WALLET_URL}/action/receive`,
        assetsLink: `${this.$env.WALLET_URL}`,
        symbol: ''
      };
    },

    computed: {
      sheetHeight() {
        return `calc(100vh - ${APP_BAR_HEIGHT}px)`;
      }
    },

    async created() {
      const chainService = await ChainService.getInstanceAsync(this.$env);

      const chainRpc = chainService.getChainRpc();
      const api = chainService.getChainNodeClient();
      const daoOpt = await api.query.deipDao.daoRepository(`0x${this.$currentUser.username}`);

      if (daoOpt.isSome) {
        const walletAddress = daoOpt.value.toJSON().authority.signatories[0];
        const balance = await chainRpc.getFungibleTokenBalanceByOwnerAsync(walletAddress, 0);
        const rawNum = new BigNumber(balance.amount).shiftedBy(-18);

        this.symbol = balance.symbol;
        this.balance = rawNum.toFormat(BigNumber.ROUND_FLOOR);
      }
    },

    methods: {
      handleCopyWalletAddressClick() {
        navigator.clipboard.writeText(this.$currentUser.address);
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
  width: 58px;
  height: 58px;
  display: flex;
  background-color:  #FFFFFF;
  margin-left: auto;
  margin-right: auto;
  margin-top: -29px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

</style>
