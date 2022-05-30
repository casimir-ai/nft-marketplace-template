<template>
  <v-card
    outlined
    class="nft-card"
  >
    <v-img
      height="230"
      width="100%"
      content-class="image-responsive"
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
          <div v-if="!content.metadata.publishAnonymously && creator" class="text-subtitle-3">
            {{ creator }}
          </div>
          <div class="text-body-1 grey--text text--lighten-2">
            {{ $$formatDate($$parseISO(content.createdAt), 'PP') }}
          </div>
        </ve-stack>

        <div class="purchase-container d-flex justify-space-between align-center">
          <div class="price-container">
            <span class="text-h3">{{ content.metadata.price.amount }} </span>
            <span class="text-subtitle-3 grey--text text--lighten-2">
              {{ content.metadata.price.symbol }}
            </span>
          </div>

          <div>
            <v-chip v-if="isCurrentUserAuthor" label outlined>
              {{ $t('components.assetCard.created') }}
            </v-chip>
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
      },

      creator() {
        const userData = this.$store.getters['users/one'](this.content.authors[0]);

        if (!userData?.attributes) return null;

        return this.$attributes
          .getMappedData('user.name', userData.attributes)?.value;
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

<style lang="scss">

.image-responsive {
  width: 100% !important;
}

</style>
