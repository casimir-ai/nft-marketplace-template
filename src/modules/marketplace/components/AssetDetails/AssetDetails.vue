<template>
  <nw-dialog
    v-model="isDialogOpen"
    persistent
    max-width="646"
    max-content-height="600"
  >
    <template #title>
      NFT
    </template>
    nft details {{ id }}
  </nw-dialog>
</template>

<script>
  import { NwDialog } from '@/components';

  export default {
    name: 'AssetDetails',

    components: {
      NwDialog
    },

    props: {
      value: {
        type: Boolean,
        default: true
      },
      id: {
        type: String,
        required: true
      },
      mainRoute: {
        type: Object,
        default: null
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
        if (!this.mainRoute) {
          this.$emit('close');
        } else {
          this.$router.push(this.mainRoute);
        }
      }
    }
  };
</script>
