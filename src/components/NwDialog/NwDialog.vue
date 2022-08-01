<template>
  <v-dialog
    v-model="isDialogOpened"
    v-bind="dialogProps"
    @keydown.esc="handleCloseClick"
  >
    <v-card>
      <div
        :class="wrapItems"
      >
        <div v-if="hasSlot('aside')" class="flex-grow-1">
          <slot name="aside" />
        </div>

        <div class="flex-grow-1">
          <v-card-title class="flex-nowrap align-start px-8 pt-8 pb-6 text-break">
            <span v-if="hasSlot('title')" class="text-h3 mr-4">
              <slot name="title" />
            </span>

            <ve-stack flow="column" gap="8" class="ml-auto">
              <slot name="titleButtons" />

              <nw-btn
                small
                icon
                kind="secondary"
                @click="handleCloseClick"
              >
                <v-icon>mdi-window-close</v-icon>
              </nw-btn>
            </ve-stack>
          </v-card-title>

          <v-card-text :class="cardClass" :style="cardStyle">
            <slot />
          </v-card-text>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import { VDialog } from 'vuetify/lib/components';

  import { VeStack } from '@deip/vue-elements';
  import {
    contextMixin,
    getBindableProps
  } from '@deip/vuetify-extended';
  import { convertToUnit } from '@deip/toolbox';

  import { NwBtn } from '../NwBtn';

  export default {
    name: 'NwDialog',

    components: {
      VeStack,
      NwBtn
    },

    mixins: [contextMixin],

    props: {
      ...VDialog.options.props,
      value: {
        type: Boolean,
        default: false
      },
      maxContentHeight: {
        type: [String, Number],
        default: null
      }
    },

    computed: {
      dialogProps() {
        return getBindableProps.call(this, VDialog.options.props);
      },
      isDialogOpened: {
        get() {
          return this.value;
        },

        set(val) {
          this.$emit('input', val);
        }
      },
      cardClass() {
        return [
          'text-body-1 px-8 pb-8',
          { 'overflow-auto': !!this.maxContentHeight }
        ];
      },
      cardStyle() {
        if (!this.maxContentHeight) {
          return null;
        }
        return { maxHeight: convertToUnit(this.maxContentHeight) };
      },
      wrapItems() {
        if (this.$vuetify.breakpoint.mdOnly
          || this.$vuetify.breakpoint.smAndDown) return 'd-flex flex-wrap';
        return 'd-flex flex-nowrap';
      }
    },

    methods: {
      handleCloseClick() {
        this.closeDialog();
      },
      closeDialog() {
        this.isDialogOpened = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  .v-card__text, .v-card__title {
    word-break: break-word;
  }
</style>
