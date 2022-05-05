<template>
  <validation-observer v-slot="{ invalid, handleSubmit }">
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(submit)"
    >
      <ve-stack>
        <ve-stack class="fields-container">
          <ve-stack
            :gap="16"
            flow="row"
            flow-sm="column"
            template-columns="1fr"
            template-columns-sm="1fr 1fr"
          >
            <ve-stack
              :gap="8"
              flow="row"
              flow-sm="row"
              template-columns="auto"
              template-columns-sm="auto"
            >
              <validation-provider
                v-slot="{ errors }"
                :name="$t('marketplace.createAsset.name')"
                rules="required"
              >
                <v-text-field
                  v-model="formData.name"
                  :label="$t('marketplace.createAsset.name')"
                  :error-messages="errors"
                  hide-details="auto"
                />
              </validation-provider>

              <validation-provider v-slot="{ errors }">
                <v-textarea
                  v-model="formData.description"
                  :label="$t('marketplace.createAsset.description')
                    + ' (' + $t('marketplace.createAsset.optional') + ')'"
                  :error-messages="errors"
                  hide-details="auto"
                  no-resize
                  rows="4"
                />
              </validation-provider>
            </ve-stack>

            <validation-provider
              v-slot="{ errors }"
              :name="$t('marketplace.createAsset.uploadFile')"
              rules="required"
            >
              <vex-image-input
                v-model="formData.image"
                :error-messages="errors"
                no-rotate
                no-flip
                no-resize
                hide-details="auto"
              />
            </validation-provider>
          </ve-stack>

          <div>
            <div class="text-h6 mb-3">
              {{ $t('marketplace.createAsset.setThePrice') }}
            </div>
            <validation-provider
              v-slot="{ errors }"
              :name="$t('marketplace.createAsset.price')"
              rules="required"
            >
              <price-selector
                v-model="formData.price"
                :error-messages="errors"
              />
            </validation-provider>
          </div>

          <div>
            <v-checkbox
              v-model="formData.publishAnonymously"
              :label="$t('marketplace.createAsset.publishAnonymouslyMessage')"
              hide-details="auto"
              class="ma-0 pa-0"
            />

            <validation-provider
              v-slot="{ errors }"
              name=" "
              :rules="{ required: { allowFalse: false } }"
            >
              <v-checkbox
                v-model="formData.confirmDonate"
                :label="$t('marketplace.createAsset.fundsMessage')"
                :error-messages="errors"
                hide-details="auto"
                class="pa-0"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name=" "
              :rules="{ required: { allowFalse: false } }"
            >
              <v-checkbox
                v-model="formData.confirmModeration"
                :label="$t('marketplace.createAsset.moderationMessage')"
                :error-messages="errors"
                hide-details="auto"
                class="pa-0"
              />
            </validation-provider>
          </div>
        </ve-stack>

        <div class="buttons-container ml-auto">
          <nw-btn
            kind="primary"
            :disabled="invalid"
            :loading="loading"
          >
            {{ $t('marketplace.createAsset.createNft') }}
          </nw-btn>
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>
  import { VeStack } from '@deip/vue-elements';
  import { VexImageInput } from '@deip/vuetify-extended';
  import { NwBtn } from '@/components';
  import PriceSelector from './PriceSelector';

  export default {
    name: 'AssetCreateForm',

    components: {
      VeStack,
      VexImageInput,
      NwBtn,
      PriceSelector
    },

    data() {
      return {
        loading: false,
        formData: {
          name: null,
          description: null,
          image: null,
          price: null,
          publishAnonymously: false,
          confirmDonate: null,
          confirmModeration: null
        }
      };
    },

    methods: {
      submit() {}

    }
  };
</script>
