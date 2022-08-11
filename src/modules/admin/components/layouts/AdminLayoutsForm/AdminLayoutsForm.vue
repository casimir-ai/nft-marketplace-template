<template>
  <layout-builder
    :layout="layoutData"
    :mode="mode"
    @success="onSuccess"
    @error="onError"
  />
</template>

<script>
  import { LayoutBuilder } from '@casimir/layouts-module';
  import { formMixin } from '@casimir/platform-components';
  import { filterObjectKeys } from '@casimir/toolbox';

  export default {
    name: 'AdminLayoutsForm',

    components: {
      LayoutBuilder
    },

    props: {
      layoutId: {
        type: String,
        default: null
      },

      ...filterObjectKeys(formMixin.props, ['mode'])
    },

    computed: {
      layoutData() {
        return this.layoutId ? this.$store.getters['layouts/one'](this.layoutId) : undefined;
      }
    },

    methods: {
      onSuccess() {
        this.$notifier.showSuccess(this.$t('admin.layouts.layout.createSuccess'));
        this.$router.push({ name: 'admin.layouts' });
      },

      onError(error) {
        this.$notifier.showError(error);
      }
    }
  };
</script>
