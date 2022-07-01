<template>
  <v-sheet
    min-height="100vh"
    class="d-flex flex-column align-center justify-center pa-16 transparent"
  >
    <v-card
      class="mx-auto pa-12 mb-6"
      outlined
      max-width="416"
      width="100%"
    >
      <ve-stack :gap="16">
        <div class="text-h3">
          {{ $t('auth.signInToContinue') }}
        </div>

        <auth-sign-in
          :username-label="$t('auth.email')"
          @success="handleSignInSuccess"
          @error="handleSignInError"
        />

        <o-auth
          @success="handleSignInSuccess"
          @error="handleSignInError"
        />
      </ve-stack>
    </v-card>
  </v-sheet>
</template>

<script>
  import { AuthSignIn } from '@deip/auth-module';
  import { VeStack } from '@deip/vue-elements';
  import OAuth from '../OAuth';

  export default {
    name: 'SignIn',
    components: {
      AuthSignIn,
      VeStack,
      OAuth
    },

    methods: {
      handleSignInSuccess() {
        this.$notifier.showSuccess(this.$t('auth.signInSuccess'));
        this.$router.push({ name: 'home' });
      },
      handleSignInError(error) {
        this.$notifier.showError(error);
      }
    }
  };
</script>
