<template>
  <vex-section class="pt-md-0">
    <ve-stack :gap="32">
      <vex-section-title :title="$t('profile.passwordTab.title')" />
      <v-sheet
        width="414"
      >
        <auth-change-password
          :repeat-password-label="$t('profile.passwordTab.repeatPasswordLabel')"
          :submit-label="$t('profile.passwordTab.submitLabel')"
          @success="handleChangePassSuccess"
          @error="handleChangePassError"
          @cancel="handleCancel"
        />
      </v-sheet>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { AuthChangePassword } from '@deip/auth-module';

  export default {
    name: 'Password',
    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      AuthChangePassword
    },
    methods: {
      handleChangePassError(error) {
        this.$notifier.showError(error);
      },
      handleChangePassSuccess() {
        this.$notifier.showSuccess(this.$t('profile.passwordTab.changePassSuccess'));
        this.$router.push({ name: 'profile.details' });
      },
      handleCancel() {
        this.$router.push({ name: 'profile.details' });
      }
    }
  };
</script>
