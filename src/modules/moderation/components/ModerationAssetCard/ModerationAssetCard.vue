<template>
  <div>
    <v-card outlined>
      <v-img
        max-height="230"
        aspect-ratio="1.3"
        :src="assetUrl"
      />

      <v-card-text class="grey--text text--darken-4">
        <ve-stack :gap="32">
          <ve-stack :gap="4">
            <div class="text-h6">
              {{ asset.title }}
            </div>
            <div class="text-subtitle-3">
              {{ creator }}
            </div>
            <ve-stack :gap="8" flow="column" class="text-body-1 grey--text text--lighten-2">
              <span>{{ $$formatDate($$parseISO(asset.createdAt), 'PP') }}</span>
              <v-icon>mdi-circle-small</v-icon>
              <span class="price-container">
                {{ asset.metadata.price.amount }}
                {{ asset.metadata.price.symbol }}

              </span>
            </ve-stack>
          </ve-stack>

          <ve-line-clamp
            v-if="asset.metadata.description"
            class="text-body-1"
            :lines="4"
          >
            {{ asset.metadata.description }}
          </ve-line-clamp>

          <ve-stack :gap="8" flow="column" class="align-end justify-end">
            <nw-btn
              kind="secondary"
              small
              :disabled="disabled"
              @click="handleDeclineClick"
            >
              {{ $t('moderation.assetCard.decline') }}
            </nw-btn>
            <nw-btn
              small
              :disabled="disabled"
              @click="handleApproveClick"
            >
              {{ $t('moderation.assetCard.approve') }}
            </nw-btn>
          </ve-stack>
        </ve-stack>
      </v-card-text>
    </v-card>

    <decline-asset-dialog
      v-if="isDeclineDialogOpened"
      v-model="isDeclineDialogOpened"
      :asset="asset"
      @success="handleDeclineSuccess"
    />
  </div>
</template>

<script>
  import { PROJECT_CONTENT_DRAFT_STATUS } from '@deip/constants';
  import { AccessService } from '@deip/access-service';
  import { dateMixin } from '@deip/platform-components';
  import { VeStack, VeLineClamp } from '@deip/vue-elements';
  import { NwBtn } from '@/components/NwBtn';
  import { DeclineAssetDialog } from '@/modules/moderation/components/DeclineAssetDialog';

  const accessService = AccessService.getInstance();

  export default {
    name: 'ModerationAssetCard',

    components: {
      VeStack,
      VeLineClamp,
      NwBtn,
      DeclineAssetDialog
    },

    mixins: [dateMixin],

    props: {
      asset: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        isDeclineDialogOpened: false,
        loading: false,
        disabled: false
      };
    },

    computed: {
      assetUrl() {
        const { DEIP_SERVER_URL } = this.$env;
        const authorization = accessService.getAccessToken();
        const { hash } = this.asset.packageFiles[0];

        // eslint-disable-next-line max-len
        return `${DEIP_SERVER_URL}/api/v2/project-content/package/${this.asset._id}/${hash}?authorization=${authorization}`;
      },

      creator() {
        const userData = this.$store.getters['users/one'](this.asset.authors[0]);
        if (!userData?.attributes) return null;
        return this.$attributes
          .getMappedData('user.name', userData.attributes)?.value;
      }
    },

    methods: {
      handleDeclineClick() {
        this.isDeclineDialogOpened = true;
      },

      handleDeclineSuccess() {
        this.setDisabled(true);
      },

      setDisabled(value) {
        this.disabled = value;
      },

      async handleApproveClick() {
        const isConfirmed = await this.$confirm(
          this.$t('moderation.assetCard.approveConfirm.message', { title: this.asset.title }),
          { title: this.$t('moderation.assetCard.approveConfirm.title') }
        );
        if (isConfirmed) {
          await this.approveAsset();
        }
      },

      async approveAsset() {
        try {
          const payload = {
            data: {
              _id: this.asset._id,
              status: PROJECT_CONTENT_DRAFT_STATUS.APPROVED
            }
          };
          await this.$store.dispatch('projectContentDrafts/moderate', payload);
          this.$notifier.showSuccess(this.$t('moderation.assetCard.approveSuccess'));
          this.setDisabled(true);
        } catch (error) {
          console.error(error?.error || error);
          this.$notifier.showError(error?.error?.message || error);
        }
      }
    }
  };
</script>
