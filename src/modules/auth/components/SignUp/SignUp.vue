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
          {{ $t('auth.createAccount') }}
        </div>

        <auth-sign-up
          ref="signUpForm"
          @success="handleSignUpSuccess"
          @error="handleSignUpError"
        />
      </ve-stack>
    </v-card>
  </v-sheet>
</template>

<script>
  import { AuthSignUp } from '@deip/auth-module';
  import { VeStack } from '@deip/vue-elements';
  import { NonFungibleTokenService } from '@casimir/token-service';

  const nonFungibleTokenService = NonFungibleTokenService.getInstance();

  export default {
    name: 'SignUp',
    components: {
      AuthSignUp,
      VeStack
    },

    methods: {
      async handleSignUpSuccess() {
        this.$refs.signUpForm.setLoading(true);
        this.$currentUser.await(async () => {
          try {
            await this.createProject();
            this.$notifier.showSuccess(this.$t('auth.signUpSuccess'));
            this.$router.push({ name: 'home' });
          } catch (error) {
            this.$notifier.showError(error);
            console.error(error);
          }
        });
      },

      handleSignUpError(error) {
        this.$notifier.showError(error);
      },

      async createProject() {
        const { _id: teamId } = await this.$store.dispatch(
          'teams/create', { initiator: this.$currentUser, attributes: [] }
        );

        const { _id: projectId } = await this.$store.dispatch(
          'projects/create', { initiator: this.$currentUser, data: { teamId, attributes: [] } }
        );

        await nonFungibleTokenService.create(
          {
            initiator: this.$currentUser,
            data: {
              issuer: teamId,
              name: '',
              description: '',
              metadata: {
                teamId,
                projectId
              }
            }
          }
        );
      }

    }
  };
</script>
