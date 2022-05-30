<template>
  <v-dialog
    v-model="isFullViewDialogOpen"
    width="auto"
    persistent
  >
    <v-card :height="imageHeight" class="image-card">
      <div class="d-flex justify-end minimize-button">
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
      <img
        :width="imageWidth"
        :height="imageHeight"
        :src="contentUrl"
        @load="loaded"
      >
    </v-card>
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

    data() {
      return {
        naturalWidth: 0,
        naturalHeight: 0
      };
    },

    computed: {
      isFullViewDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      },
      imageWidth() {
        return this.naturalWidth > 1100 ? '1100' : this.naturalWidth;
      },
      imageHeight() {
        return this.naturalHeight > 600 ? '600' : this.naturalHeight;
      }
    },

    methods: {
      loaded(e) {
        const img = e.target;
        if (img) {
          this.naturalWidth = img.naturalWidth;
          this.naturalHeight = img.naturalHeight;
        }
      },
      closeDialog() {
        this.isFullViewDialogOpen = false;
      },
      handleMinimizeClick() {
        this.closeDialog();
      }
    }
  };
</script>

<style scoped lang="scss">
  .minimize-button {
    position: absolute;
    top: 32px;
    right: 32px;
  }
  .image-card {
    position: relative;
    overflow: hidden;
  }
</style>
