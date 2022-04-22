<template>
  <v-dialog
    v-model="isDialogOpened"
    v-bind="dialogProps"
  >
    <v-card>
      <div class="d-flex flex-wrap">
        <div v-if="hasSlot('aside')" class="flex-grow-1">
          <slot name="aside" />
        </div>

        <div class="flex-grow-1">
          <v-card-title class="flex-nowrap align-start px-8 pt-8 pb-6">
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

          <v-card-text class="text-body-1 px-8 pb-8">
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
