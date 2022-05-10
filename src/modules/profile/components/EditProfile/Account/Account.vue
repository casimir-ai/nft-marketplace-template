<template>
  <vex-section class="pt-md-0">
    <v-sheet max-width="414">
      <user-form
        :schema="$layouts.getMappedData('user.form').value"
        :user="$currentUser"
        :submit-label="$t('profile.accountTab.submitLabel')"
        @success="handleSuccess"
        @error="handleError"
        @cancel="handleCancel"
      />
    </v-sheet>
  </vex-section>
</template>

<script>
  import { VexSection } from '@deip/vuetify-extended';
  import { UserForm } from '@deip/users-module';

  export default {
    name: 'Account',
    components: {
      VexSection,
      UserForm
    },

    methods: {
      handleSuccess() {
        this.$notifier.showSuccess(this.$t('profile.accountTab.editSuccess'));
        this.$router.push({ name: 'profile.details' });
      },
      handleError(error) {
        this.$notifier.showError(error);
      },
      handleCancel() {
        this.$router.push({ name: 'profile.details' });
      }
    }

  };
</script>
