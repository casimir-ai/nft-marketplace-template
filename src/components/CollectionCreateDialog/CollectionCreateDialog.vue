<template>
  <nw-dialog
    v-model="isDialogOpen"
    persistent
    max-width="646"
    max-content-height="600"
  >
    <template #title>
      {{ $t('components.collectionCreateDialog.title') }}
    </template>
    <collection-create-form
      ref="collectionCreateForm"
      class="d-block mt-1"
      @close-dialog="closeDialog"
    />
  </nw-dialog>
</template>

<script>
  import { NwDialog } from '@/components/NwDialog';
  import CollectionCreateForm from './CollectionCreateForm';

  export default {
    name: 'CollectionCreateDialog',
    components: {
      NwDialog,
      CollectionCreateForm
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
      value: {
        handler(newVal) {
          this.isDialogOpen = newVal;
        }
      },
      isDialogOpen: {
        handler(newVal) {
          this.$emit('input', newVal);
          if (!newVal) {
            this.$refs.collectionCreateForm.clearForm();
          }
        }
      }
    },

    methods: {
      closeDialog() {
        this.isDialogOpen = false;
      }
    }
  };
</script>
