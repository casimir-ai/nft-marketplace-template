import { VChip } from 'vuetify';
import { defineComponent } from '@deip/platform-util';
import { NftItemMetadataDraftStatus } from '@casimir/platform-core';

export default defineComponent({
  name: 'AssetStatus',

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    getStatusLabel(status) {
      return this.$t(`components.assetCard.status.${NftItemMetadataDraftStatus[status]}`);
    }
  },

  render() {
    return <VChip outlined> { this.getStatusLabel(this.schemaData.data.status) } </VChip>;
  }
});
