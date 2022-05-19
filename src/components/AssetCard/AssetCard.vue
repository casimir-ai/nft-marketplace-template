<template>
  <v-card outlined class="nft-card">
    <v-img
      height="230"
      :src="contentUrl"
    >
      <div class="button-container d-flex justify-end mt-4 mr-4">
        <nw-btn
          icon
          small
          kind="secondary"
          class="white"
          :title="$t('components.assetCard.copyLink')"
          @click.prevent="handleCopyLinkClick"
        >
          <v-icon>mdi-link</v-icon>
        </nw-btn>
      </div>
    </v-img>

    <v-card-text class="grey--text text--darken-4">
      <ve-stack :gap="32">
        <ve-stack :gap="4">
          <div class="text-h6">
            {{ content.title }}
          </div>
          <div class="text-subtitle-3">
            <!-- TODO replace with user name-->
            @username
          </div>
          <div class="text-body-1 grey--text text--lighten-2">
            {{ $$formatDate($$parseISO(content.createdAt), 'PP') }}
          </div>
        </ve-stack>

        <div class="purchase-container d-flex justify-space-between">
          <div class="price-container">
            <span class="text-h3">20 </span>
            <span class="text-subtitle-3 grey--text text--lighten-2">wUSDT</span>
          </div>

          <div class="buttons-container">
            <nw-btn v-if="isCurrentUserAuthor" kind="primary" small>
              {{ $t('components.assetCard.support') }}
            </nw-btn>
          </div>
        </div>
      </ve-stack>
    </v-card-text>
  </v-card>
</template>

<script>
  import { AccessService } from '@deip/access-service';
  import { dateMixin } from '@deip/platform-components';
  import { VeStack } from '@deip/vue-elements';
  import { NwBtn } from '@/components/NwBtn';

  const accessService = AccessService.getInstance();

  export default {
    name: 'AssetCard',

    components: {
      VeStack,
      NwBtn
    },

    mixins: [dateMixin],

    props: {
      content: {
        type: Object,
        required: true
      }
    },

    computed: {
      contentUrl() {
        const { DEIP_SERVER_URL } = this.$env;
        const authorization = accessService.getAccessToken();
        const { hash } = this.content.packageFiles[0];

        // eslint-disable-next-line max-len
        return `${DEIP_SERVER_URL}/api/v2/project-content/package/${this.content._id}/${hash}?authorization=${authorization}`;
      },

      isCurrentUserAuthor() {
        return this.content.authors.includes(this.$currentUser._id);
      }
    },

    methods: {
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
