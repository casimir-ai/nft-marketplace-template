<template>
  <v-sheet>
    <vex-section class="section pt-md-0">
      <ve-stack class="d-flex-column align-center justify-center mb-8">
        <div class="d-flex align-center justify-center">
          <user-avatar
            size="100"
            :user="$currentUser"
            class="avatar"
          />
        </div>

        <div class="d-flex align-center justify-center">
          <h3 class="text-h3">
            {{ name }}
          </h3>
        </div>

        <div class="d-flex align-center justify-center">
          <div class="text-body-1 mr-2">
            {{ walletAddress }}
          </div>
          <nw-btn
            icon
            small
            kind="secondary"
            width="24"
            height="24"
            :title="$t('profile.copy')"
            @click="handleCopyWalletAddressClick"
          >
            <v-icon size="16">
              mdi-content-copy
            </v-icon>
          </nw-btn>
        </div>

        <div class="d-flex align-center justify-center">
          <nw-btn
            small
            kind="secondary"
            :to="editProfileRoute"
            class="mr-4"
          >
            {{ $t('profile.editProfileRoute') }}
          </nw-btn>
          <nw-btn
            icon
            small
            kind="secondary"
            :title="$t('profile.share')"
            @click="handleShareLinkClick"
          >
            <v-icon>mdi-share-variant</v-icon>
          </nw-btn>
        </div>
      </ve-stack>

      <v-tabs
        v-model="tabs"
        background-color="transparent"
        centered
        fixed-tabs
      >
        <v-tabs-slider />

        <v-tab>
          {{ $t('profile.createdAssets.created') }}
        </v-tab>

        <v-tab>
          {{ $t('profile.soldAssets.sold') }}
        </v-tab>

        <v-tab>
          {{ $t('profile.purchasedAssets.purchased') }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <created-assets />
        </v-tab-item>
        <v-tab-item>
          <sold-assets />
        </v-tab-item>
        <v-tab-item>
          <purchased-assets />
        </v-tab-item>
      </v-tabs-items>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { VexSection } from '@deip/vuetify-extended';
  import { UserAvatar } from '@deip/users-module';
  import { VeStack } from '@deip/vue-elements';
  import { NwBtn } from '@/components/NwBtn';
  import { CreatedAssets } from '@/modules/profile/components/CreatedAssets';
  import { PurchasedAssets } from '@/modules/profile/components/PurchasedAssets';
  import { SoldAssets } from '@/modules/profile/components/SoldAssets';

  export default {
    name: 'Profile',
    components: {
      VexSection,
      VeStack,
      UserAvatar,
      NwBtn,
      CreatedAssets,
      PurchasedAssets,
      SoldAssets
    },

    data() {
      return {
        tabs: null
      };
    },

    computed: {
      editProfileRoute() {
        return {
          name: 'profile.edit'
        };
      },

      name() {
        const username = this.$attributes
          .getMappedData('user.name', this.$currentUser.attributes)?.value;
        return username ? `@${username}` : `@${this.$currentUser._id}`;
      },

      walletAddress() {
        return this.$currentUser.profile.address;
      }

    },

    methods: {
      handleCopyWalletAddressClick() {
        navigator.clipboard.writeText(this.walletAddress);
        this.$notifier.showSuccess(this.$t('profile.copyWalletAddressSuccess'));
      },
      handleShareLinkClick() {
        navigator.clipboard.writeText(window.location.href);
        this.$notifier.showSuccess(this.$t('profile.shareLinkSuccess'));
      }
    }
  };

</script>

<style lang="scss" scoped>
.section {
  margin-top: 136px;
}
.avatar {
  margin-top: -50px;
  border: 4px solid #FFFFFF;
}
.v-tabs{
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

</style>
