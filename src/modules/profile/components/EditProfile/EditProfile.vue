<template>
  <v-sheet>
    <vex-section :height="sectionHeight">
      <ve-stack class="align-center justify-center">
        <vex-section-title
          :title="$t('profile.editProfileTitle')"
          class="mb-11"
        />

        <v-tabs vertical>
          <v-tab class="mb-9">
            {{ $t('profile.accountTab.name') }}
          </v-tab>
          <v-tab>
            {{ $t('profile.passwordTab.name') }}
          </v-tab>

          <v-tab-item>
            <account />
          </v-tab-item>
          <v-tab-item>
            <password />
          </v-tab-item>
        </v-tabs>
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { Account } from '@/modules/profile/components/EditProfile/Account';
  import { Password } from '@/modules/profile/components/EditProfile/Password';
  import { APP_BAR_HEIGHT } from '@/constants';

  export default {
    name: 'EditProfile',
    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      Account,
      Password
    },

    computed: {
      sectionHeight() {
        return `calc(100vh - ${APP_BAR_HEIGHT}px)`;
      }
    }

  };
</script>

<style lang="scss" scoped>
.v-tabs--vertical > .v-tabs-bar .v-tab {
    height: 16px;
}

.v-tabs--vertical > .v-tabs-bar .v-tabs-slider {
    height: 16px;
}
</style>
