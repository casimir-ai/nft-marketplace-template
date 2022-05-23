<!-- eslint-disable max-len -->
<template>
  <div>
    <nw-dialog
      v-model="isShareNftDialogOpen"
      persistent
      :max-width="496"
      max-content-height="600"
    >
      <template #title>
        {{ $t('marketplace.assetDetails.shareDialogTitle') }}
      </template>
      <div class="icons-container d-flex justify-space-between">
        <div class="d-flex flex-column justify-center align-center">
          <nw-btn
            icon
            kind="secondary"
            width="64"
            height="64"
          >
            <v-icon size="24">
              mdi-twitter
            </v-icon>
          </nw-btn>
          <div class="text-body-1 grey--text text--lighten-2">
            {{ $t('marketplace.assetDetails.twitter') }}
          </div>
        </div>
        <div class="d-flex flex-column justify-center align-center">
          <nw-btn
            icon
            kind="secondary"
            width="64"
            height="64"
          >
            <v-icon size="24">
              mdi-facebook
            </v-icon>
          </nw-btn>
          <div class="text-body-1 grey--text text--lighten-2 mt-1">
            {{ $t('marketplace.assetDetails.facebook') }}
          </div>
        </div>
        <div class="d-flex flex-column justify-center align-center">
          <nw-btn
            icon
            kind="secondary"
            width="64"
            height="64"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.09992 11.0269C8.39488 9.05119 11.2589 7.74867 12.6919 7.11936C16.7834 5.32254 17.6335 5.01042 18.1877 5.00011C18.3095 4.99784 18.5821 5.02973 18.7586 5.18096C18.9076 5.30866 18.9486 5.48116 18.9683 5.60223C18.9879 5.7233 19.0123 5.9991 18.9929 6.2146C18.7712 8.6743 17.8118 14.6433 17.3237 17.3983C17.1172 18.564 16.7105 18.9548 16.3169 18.9931C15.4613 19.0762 14.8116 18.3961 13.9829 17.8225C12.6862 16.9251 11.9537 16.3664 10.695 15.4907C9.24043 14.4786 10.1834 13.9223 11.0124 13.0132C11.2293 12.7753 14.999 9.15509 15.0719 8.82668C15.0811 8.7856 15.0895 8.6325 15.0034 8.55166C14.9172 8.47081 14.7901 8.49846 14.6983 8.52045C14.5683 8.55161 12.4968 9.99723 8.48389 12.8573C7.89591 13.2836 7.36333 13.4913 6.88616 13.4804C6.36012 13.4684 5.34822 13.1664 4.59598 12.9082C3.67333 12.5915 2.94002 12.4241 3.00388 11.8863C3.03714 11.6062 3.40248 11.3197 4.09992 11.0269Z"
                fill="black"
                fill-opacity="0.95"
              />
            </svg>
          </nw-btn>
          <div class="text-body-1 grey--text text--lighten-2 mt-1">
            {{ $t('marketplace.assetDetails.telegram') }}
          </div>
        </div>
        <div class="d-flex flex-column justify-center align-center">
          <nw-btn
            icon
            kind="secondary"
            width="64"
            height="64"
          >
            <v-icon size="24">
              mdi-email
            </v-icon>
          </nw-btn>
          <div class="text-body-1 grey--text text--lighten-2 mt-1">
            {{ $t('marketplace.assetDetails.email') }}
          </div>
        </div>
        <div class="d-flex flex-column justify-center align-center">
          <nw-btn
            icon
            kind="secondary"
            width="64"
            height="64"
            @click="handleCopyLinkClick"
          >
            <v-icon size="24">
              mdi-link
            </v-icon>
          </nw-btn>
          <div class="text-body-1 grey--text text--lighten-2 mt-1">
            {{ $t('marketplace.assetDetails.link') }}
          </div>
        </div>
      </div>
    </nw-dialog>
  </div>
</template>

<script>

  import { NwDialog, NwBtn } from '@/components';

  export default {
    name: 'ShareNftDialog',

    components: {
      NwDialog,
      NwBtn
    },

    props: {
      content: {
        type: Object,
        required: true
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      isShareNftDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
          if (!value) this.closeDialog();
        }
      }
    },

    methods: {
      closeDialog() {
        this.$router.push({ name: 'marketplace' });
      },
      handleMinimizeClick() {
        this.closeDialog();
      },
      handleCopyLinkClick() {
        const props = this.$router.resolve({
          name: 'assetDetails',
          params: { id: this.content._id }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      }
    }
  };
</script>
