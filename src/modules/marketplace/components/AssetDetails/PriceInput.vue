<template>
  <div>
    <validation-provider
      v-slot="{ errors }"
      :name="$t('marketplace.priceSelector.yourPrice')"
      :rules="{
        number: true,
        required: true
      }"
    >
      <v-text-field
        ref="newPrice"
        v-model="internalValue"
        height="60px"
        autocomplete="off"
        :label="$t('marketplace.priceSelector.yourPrice')"
        :error-messages="errors"
        class="text-field-style"
        @blur="handleTextFieldBlur"
      >
        <template slot="append">
          <div class="pt-1 pb-1 grey--text text--lighten-2">
            wUSDT
          </div>
        </template>
      </v-text-field>
    </validation-provider>
  </div>
</template>

<script>
  export default {
    name: 'PriceInput',

    model: {
      prop: 'value',
      event: 'change'
    },

    props: {
      value: {
        type: String,
        default: null
      }
    },

    data() {
      return {
        internalValue: this.value
      };
    },

    watch: {
      internalValue(val) {
        this.$emit('change', val);
      }
    },

    mounted() {
      this.$refs.newPrice.focus();
    },

    methods: {
      handleTextFieldBlur() {
        this.$emit('blur');
      }
    }
  };
</script>
