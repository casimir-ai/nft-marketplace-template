<template>
  <div>
    <nw-btn
      v-if="$isGuest"
      kind="secondary"
      small
      active-class="no-active"
      :to="{ name: 'signIn' }"
    >
      {{ $t('auth.signIn') }}
    </nw-btn>

    <v-menu
      v-if="$isUser"
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
  </div>
</template>

<script>
  import { NwBtn } from '../NwBtn';

  export default {
    name: 'AppBarUser',

    components: {
      NwBtn
    },

    computed: {
      userMenu() {
        return [
          {
            label: this.$t('components.appBar.account'),
            icon: 'mdi-account',
            to: { name: 'account.details' }
          },
          {
            label: this.$t('components.appBar.wallet'),
            icon: 'mdi-wallet',
            to: { name: 'account.wallet' }
          }
        ];
      }
    },

    methods: {
      handleSignOut() {
        this.$store.dispatch('auth/signOut');
      }
    }
  };
</script>
