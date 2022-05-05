<template>
  <nw-dialog
    v-model="isDialogOpen"
    persistent
    max-width="646"
    max-content-height="600"
  >
    <template #title>
      {{ $t('marketplace.createAsset.formTitle') }}
    </template>
    <asset-create-form />
  </nw-dialog>
</template>

<script>
  import { NwDialog } from '@/components';
  import AssetCreateForm from './AssetCreateForm';

  export default {
    name: 'AssetCreateDialog',
    components: {
      NwDialog,
      AssetCreateForm
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isDialogOpen: this.value
      };
    },

    watch: {
      isDialogOpen: {
        handler(newVal) {
          if (!newVal) {
            this.closeDialog();
          }
        }
      }
    },

    methods: {
      closeDialog() {
        this.$router.push({ name: 'marketplace' });
      }
    }
  };
</script>
