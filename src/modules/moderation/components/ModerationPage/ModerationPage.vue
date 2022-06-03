<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('moderation.title')"
      />
      <v-tabs
        v-model="tab"
        background-color="transparent"
        centered
        fixed-tabs
        class="transparent"
      >
        <v-tab>
          {{ $t('moderation.pending') }}
        </v-tab>
        <v-tab>
          {{ $t('moderation.reviewed') }}
        </v-tab>

        <v-tabs-items
          v-model="tab"
          class="transparent mt-4"
        >
          <v-tab-item>
            <pending-assets-list />
          </v-tab-item>

          <v-tab-item>
            <reviewed-assets-list />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { awaitForStore } from '@deip/platform-util';

  import { PendingAssetsList } from '@/modules/moderation/components/PendingAssetsList';
  import { ReviewedAssetsList } from '@/modules/moderation/components/ReviewedAssetsList';

  export default {
    name: 'ModerationPage',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      PendingAssetsList,
      ReviewedAssetsList
    },

    data() {
      return { tab: null };
    },

    created() {
      awaitForStore(this.$store, 'currentPortal/data').then(this.checkRole);
    },

    methods: {
      checkRole() {
        const { moderators = [] } = this.$currentPortal?.profile?.settings?.moderation || {};
        const isModerator = moderators.includes(this.$currentUser?._id);

        if (!isModerator) {
          this.$router.push({ name: 'home' });
        }
      }
    }
  };
</script>
