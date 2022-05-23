<template>
  <v-dialog
    v-model="isFullViewDialogOpen"
    persistent
    :max-width="1100"
    max-content-height="600"
  >
    <v-img
      height="100%"
      width="100%"
      :src="contentUrl"
    >
      <div class="d-flex justify-end mt-8 mr-8">
        <nw-btn
          icon
          small
          kind="secondary"
          class="white"
          :title="$t('marketplace.assetDetails.minimize')"
          @click.prevent="handleMinimizeClick"
        >
          <v-icon>mdi-arrow-collapse</v-icon>
        </nw-btn>
      </div>
    </v-img>
  </v-dialog>
</template>

<script>
  import { NwBtn } from '@/components';

  export default {
    name: 'FullViewDialog',

    components: {
      NwBtn
    },

    props: {
      value: {
        type: Boolean,
        default: false
      },
      contentId: {
        type: String,
        required: true
      },
      contentUrl: {
        type: String,
        required: true
      }
    },

    computed: {
      isFullViewDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },

    methods: {
      closeDialog() {
        this.isFullViewDialogOpen = false;
      },
      handleMinimizeClick() {
        this.closeDialog();
      }
    }
  };
</script>
