<template>
  <div v-if="content">
    <nw-dialog
      v-model="isDialogOpen"
      persistent
      :max-width="maxWidth"
      max-content-height="600"
    >
      <template v-if="!completeCheckout" #aside>
        <v-img
          height="500"
          :min-width="minImageWidth"
          content-class="responsive-image"
          :src="contentUrl"
        >
          <div class="d-flex justify-end mt-8 mr-8">
            <nw-btn
              icon
              small
              kind="secondary"
              class="white"
              :title="$t('marketplace.assetDetails.fullView')"
              @click="handleFullViewClick"
            >
              <v-icon>mdi-arrow-expand</v-icon>
            </nw-btn>
          </div>
        </v-img>
      </template>
      <template #title>
        <div>
          <nw-btn
            v-if="completeCheckout"
            kind="tetriary"
            small
            @click="handleBackClick"
          >
            <v-icon
              left
              dark
            >
              mdi-chevron-left
            </v-icon>
            {{ $t('marketplace.assetDetails.backButton') }}
          </nw-btn>
          <div>
            {{ title }}
          </div>
        </div>
      </template>
      <template v-if="!completeCheckout" #titleButtons>
        <nw-btn
          small
          icon
          kind="secondary"
          @click="handleCopyLinkClick"
        >
          <v-icon>mdi-share-variant</v-icon>
        </nw-btn>
      </template>
      <div v-if="!completeCheckout" class="content-container mb-3">
        <div>
          {{ content.metadata.description }}
        </div>

        <v-row no-gutters class="mt-8">
          <v-col cols="12" md="6">
            <div class="mb-9">
              <div class="text-body-1 grey--text text--lighten-2">
                {{ $t('marketplace.assetDetails.creator') }}
              </div>
              <div v-if="!content.metadata.publishAnonymously && creator" class="text-subtitle-2">
                {{ creator }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mb-9">
              <div class="text-body-1 grey--text text--lighten-2">
                {{ $t('marketplace.assetDetails.created') }}
              </div>
              <div class="text-subtitle-2">
                {{ $$formatDate($$parseISO(content.createdAt), 'PP') }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mb-9">
              <div class="text-body-1 grey--text text--lighten-2">
                {{ $t('marketplace.assetDetails.price') }}
              </div>
              <div>
                <span class="text-subtitle-1">{{ content.metadata.price.amount }} </span>
                <span class="text-body-1 grey--text text--lighten-2">
                  {{ content.metadata.price.symbol }}
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row v-if="!isCurrentUserAuthor && !completeCheckout">
        <v-col cols="12" md="6">
          <nw-btn
            kind="primary"
            width="100%"
            block
            @click="handleSupportClick"
          >
            {{ $t('marketplace.assetDetails.support') }}
          </nw-btn>
        </v-col>
      </v-row>
      <complete-checkout
        v-if="completeCheckout"
        :content="content"
        :creator-name="creator"
        :content-url="contentUrl"
      />
    </nw-dialog>
    <full-view-dialog
      v-model="isFullViewDialogOpen"
      :content-id="id"
      :content-url="contentUrl"
    />
  </div>
</template>

<script>
  import { AccessService } from '@deip/access-service';
  import { dateMixin } from '@deip/platform-components';
  import { userHelpersMixin } from '@deip/users-module';
  import { NwDialog, NwBtn } from '@/components';
  import CompleteCheckout from './CompleteCheckout';
  import FullViewDialog from './FullViewDialog';

  const accessService = AccessService.getInstance();

  export default {
    name: 'AssetDetails',

    components: {
      NwDialog,
      NwBtn,
      CompleteCheckout,
      FullViewDialog
    },

    mixins: [dateMixin, userHelpersMixin],

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
      },
      isDraft: {
        type: Boolean,
        default: false
      }

    },

    data() {
      return {
        loading: false,
        completeCheckout: false,
        isFullViewDialogOpen: false,
        showBackButton: false
      };
    },

    computed: {
      title() {
        return this.completeCheckout ? this.$t('marketplace.assetDetails.completeCheckout')
          : this.content.title;
      },

      content() {
        return (this.isDraft)
          ? this.$store.getters['projectContentDrafts/one'](this.id)
          : this.$store.getters['projectContent/one'](this.id);
      },

      contentUrl() {
        const { DEIP_SERVER_URL } = this.$env;
        const authorization = accessService.getAccessToken();
        const { hash } = this.content.packageFiles[0];

        // eslint-disable-next-line max-len
        return `${DEIP_SERVER_URL}/api/v2/project-content/package/${this.content._id}/${hash}?authorization=${authorization}`;
      },

      creator() {
        const userData = this.$store.getters['users/one'](this.content.authors[0]);

        if (!userData?.attributes) return null;

        return this.$attributes
          .getMappedData('user.name', userData.attributes)?.value;
      },

      isCurrentUserAuthor() {
        return this.content.authors.includes(this.$currentUser._id);
      },

      maxWidth() {
        return this.completeCheckout ? '638' : '1100';
      },

      minImageWidth() {
        return this.$vuetify.breakpoint.xs ? null : '500';
      },

      isDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
          if (!value) {
            this.closeDialog();
          }
        }
      }
    },

    created() {
      this.getData();
    },

    methods: {
      closeDialog() {
        if (!this.mainRoute) {
          this.$emit('close');
        } else {
          this.$router.push(this.mainRoute);
        }
      },

      async getData() {
        try {
          if (this.isDraft) await this.$store.dispatch('projectContentDrafts/getOne', this.id);
          else await this.$store.dispatch('projectContent/getOne', this.id);
          await this.$store.dispatch('users/getOne', this.content.authors[0]);
        } catch (error) {
          console.error(error);
        }
      },

      handleFullViewClick() {
        this.isFullViewDialogOpen = true;
      },

      handleCopyLinkClick() {
        const props = this.$router.resolve({
          name: 'assetDetails',
          params: { id: this.content._id }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

      handleSupportClick() {
        this.completeCheckout = true;
      },

      handleBackClick() {
        this.completeCheckout = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  .content-container {
    word-break: break-all;
  }
</style>

<style  lang="scss">
  .responsive-image {
    width: 100% !important;
  }
</style>
