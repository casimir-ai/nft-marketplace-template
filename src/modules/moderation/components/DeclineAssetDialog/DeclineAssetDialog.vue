<template>
  <nw-dialog
    v-model="isDialogOpen"
    width="600"
  >
    <template v-if="asset" #title>
      {{ $t('moderation.declineDialog.title', {title: asset.title}) }}
    </template>

    <ve-stack>
      <v-text-field
        v-model="reason"
        :label="$t('moderation.declineDialog.reason')"
      />

      <ve-stack :gap="8" flow="column" class="justify-end">
        <nw-btn
          kind="secondary"
          small
          :loading="loading"
          @click="handleCancelClick"
        >
          {{ $t('moderation.declineDialog.cancel') }}
        </nw-btn>
        <nw-btn
          small
          :loading="loading"
          @click="handleConfirmClick"
        >
          {{ $t('moderation.declineDialog.confirm') }}
        </nw-btn>
      </ve-stack>
    </ve-stack>
  </nw-dialog>
</template>

<script>
  import { PROJECT_CONTENT_DRAFT_STATUS } from '@deip/constants';
  import { VeStack } from '@deip/vue-elements';
  import { NwDialog, NwBtn } from '@/components';

  export default {
    name: 'DeclineAssetDialog',

    components: {
      VeStack,
      NwDialog,
      NwBtn
    },

    props: {
      value: {
        type: Boolean,
        default: false
      },
      asset: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
        reason: null,
        loading: false
      };
    },

    computed: {
      isDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.reason = null;
          this.$emit('input', value);
        }
      }
    },

    methods: {
      closeDialog() {
        this.isDialogOpen = false;
      },

      handleCancelClick() {
        this.closeDialog();
      },

      handleConfirmClick() {
        this.declineAsset();
      },

      setLoading(value) {
        this.loading = value;
      },

      async declineAsset() {
        this.setLoading(true);
        try {
          const payload = {
            data: {
              _id: this.asset._id,
              status: PROJECT_CONTENT_DRAFT_STATUS.REJECTED,
              moderationMessage: this.reason
            }
          };
          await this.$store.dispatch('projectContentDrafts/moderate', payload);
          this.$notifier.showSuccess(this.$t('moderation.declineDialog.declineSuccess'));
          this.$emit('success', this.asset);
          this.closeDialog();
        } catch (error) {
          console.error(error?.error || error);
          this.$notifier.showError(error?.error?.message || error);
        }
        this.setLoading(false);
      }
    }
  };
</script>
