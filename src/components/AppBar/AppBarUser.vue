<template>
  <ve-stack flow="column" gap="8">
    <nw-btn
      v-if="$isGuest"
      kind="secondary"
      small
      active-class="no-active"
      :to="{ name: 'signIn' }"
    >
      {{ $t('auth.signIn') }}
    </nw-btn>

    <template v-if="$isUser">
      <v-menu
        bottom
        left
        offset-y
        min-width="220"
      >
        <template #activator="{ on }">
          <nw-btn
            kind="tetriary"
            small
            v-on="on"
          >
            {{ $t('components.appBar.profile') }}
          </nw-btn>
        </template>

        <v-list dense active-class="primary">
          <v-list-item
            v-for="(item, index) of userMenu"
            :key="'nav-tab-' + index"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-if="item.icon">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.label }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isModerator" :to="{ name: 'moderation' }">
            <v-list-item-icon>
              <v-icon>mdi-thumbs-up-down</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('components.appBar.moderation') }}</v-list-item-title>
          </v-list-item>

          <template v-if="$currentUser.isAdmin">
            <v-divider />
            <v-list-item
              :to="{ name: 'admin' }"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-tie</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('components.appBar.admin') }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-divider />

          <v-list-item @click="handleSignOut">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('auth.signOut') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <nw-btn
        v-if="nftCollection"
        kind="primary"
        :disabled="loading"
        small
        active-class="no-active"
        @click="handleCreateAssetClick"
      >
        {{ $t('components.appBar.submitAsset') }}
      </nw-btn>

      <nw-btn
        v-else
        :disabled="loading"
        kind="primary"
        small
        active-class="no-active"
        @click="handleCreateCollectionClick"
      >
        {{ $t('components.appBar.createCollection') }}
      </nw-btn>

      <asset-create-dialog
        v-model="isCreateAssetDialogOpened"
      />

      <collection-create-dialog
        v-model="isCreateCollectionDialogOpened"
      />
    </template>
  </ve-stack>
</template>

<script>
  import { VeStack } from '@deip/vue-elements';
  import { AssetCreateDialog } from '@/modules/marketplace/components/AssetCreateDialog';
  import { CollectionCreateDialog } from '../CollectionCreateDialog';
  import { NwBtn } from '../NwBtn';

  export default {
    name: 'AppBarUser',

    components: {
      VeStack,
      NwBtn,
      AssetCreateDialog,
      CollectionCreateDialog
    },

    props: {
      loading: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isCreateAssetDialogOpened: false,
        isCreateCollectionDialogOpened: false
      };
    },

    computed: {
      userMenu() {
        return [
          {
            label: this.$t('components.appBar.account'),
            icon: 'mdi-account',
            to: { name: 'profile.details' }
          },
          {
            label: this.$t('components.appBar.wallet'),
            icon: 'mdi-wallet',
            to: { name: 'wallet' }
          }
        ];
      },
      isModerator() {
        const {
          moderators = [],
          nftItemMetadataDraftModerationRequired = false
        } = this.$currentPortal?.profile?.settings?.moderation || {};

        return nftItemMetadataDraftModerationRequired
          && moderators.includes(this.$currentUser?._id);
      },

      nftCollection() {
        return this.$store.getters.userNftCollection;
      }
    },

    methods: {
      handleSignOut() {
        this.$store.dispatch('auth/signOut');
      },

      handleCreateAssetClick() {
        this.isCreateAssetDialogOpened = true;
      },

      handleCreateCollectionClick() {
        this.isCreateCollectionDialogOpened = true;
      }
    }
  };
</script>
