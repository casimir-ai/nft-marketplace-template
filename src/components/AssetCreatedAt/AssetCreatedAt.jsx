import { defineComponent } from '@casimir/platform-util';
import { dateMixin } from '@casimir/platform-components';

export default defineComponent({
  name: 'AssetCreatedAt',

  mixins: [dateMixin],

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    createdAtDate() {
      return this.schemaData.data.createdAt;
    }
  },

  render() {
    if (!this.createdAtDate) {
      return null;
    }

    return <span>{ this.$$formatDate(this.$$parseISO(this.createdAtDate), 'PP') }</span>;
  }
});
