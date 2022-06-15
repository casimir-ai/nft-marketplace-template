<template>
  <div
    v-if="defaultFungibleToken"
    :class="{'price-selector-container': true,
             'price-selector-container--is-disabled': disabled}"
  >
    <v-item-group
      v-model="internalValue"
      class="d-flex amount-container mb-2"
    >
      <v-item
        v-for="amount in amounts"
        :key="amount"
        :value="amount"
      >
        <div
          :class="getItemClass(amount)"
          @click="handleSelect(amount)"
        >
          {{ amount }} {{ defaultFungibleToken.symbol }}
        </div>
      </v-item>
      <v-item>
        <div class="custom-price-container d-flex">
          <div
            :class="customPriceClass"
            @click="handleCustomPriceClick"
          >
            {{ $t('marketplace.priceSelector.yourPrice') }}
          </div>
          <validation-observer
            v-show="isTextFieldVisible"
            ref="amountObserver"
          >
            <validation-provider
              v-slot="{ errors }"
              :name="$t('marketplace.priceSelector.yourPrice')"
              :rules="{
                number: true,
                minValue: amounts[0]
              }"
            >
              <v-text-field
                ref="customPrice"
                :value="textFieldValue"
                autocomplete="off"
                :placeholder="$t('marketplace.priceSelector.yourPrice')"
                :error-messages="errors"
                hide-details="auto"
                dense
                class="custom-price-input"
                @input="handleTextFieldInput"
                @blur="handleTextFieldBlur"
              />
            </validation-provider>
          </validation-observer>
        </div>
      </v-item>
    </v-item-group>
    <v-messages v-if="errorMessages" :value="errorMessages" color="error" />
  </div>
</template>

<script>
  const amounts = [10, 20, 30];
  const itemClasses = 'amount text-button-2 rounded px-2 py-2 d-flex justify-center align-center';

  export default {
    name: 'PriceSelector',

    model: {
      prop: 'value',
      event: 'change'
    },

    props: {
      value: {
        type: Number,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      errorMessages: {
        type: Array,
        default: null
      }
    },

    data() {
      return {
        amounts,
        internalValue: this.value,
        textFieldValue: this.value,
        isTextFieldVisible: false
      };
    },

    computed: {
      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      },
      customPriceClass() {
        return [
          itemClasses,
          { 'amount--active': this.isTextFieldVisible }
        ];
      }
    },

    watch: {
      internalValue(val) {
        this.$emit('change', val);
      }
    },

    methods: {
      handleSelect(amount) {
        this.isTextFieldVisible = false;
        this.textFieldValue = null;
        this.internalValue = amount;
      },

      handleCustomPriceClick() {
        this.internalValue = null;
        this.isTextFieldVisible = true;
        this.$refs.customPrice.focus();
      },

      handleTextFieldInput(val) {
        this.textFieldValue = val;
      },

      handleTextFieldBlur() {
        this.$refs.amountObserver.validate()
          .then((isValid) => {
            if (isValid && this.textFieldValue) {
              this.internalValue = parseFloat(this.textFieldValue);
            }
          });
      },

      getItemClass(amount) {
        return [
          itemClasses,
          { 'amount--active': amount === this.internalValue && !this.isTextFieldVisible }
        ];
      }
    }
  };
</script>

<style scoped lang="scss">
  .price-selector-container {
    &--is-disabled {
      pointer-events: none;
      color: rgba(0, 0, 0, 0.38);
    }

    .amount-container {
      gap: 8px;

      .amount {
        height: 40px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.12);

        &:hover, &--active {
          color: var(--v-anchor);
          border-color: transparent;
          background-color: rgba(1, 102, 255, 0.12);
        }

        &--disabled {
          pointer-events: none;
        }
      }

      .custom-price-container {
        gap: 8px;
      }
    }
  }
</style>
