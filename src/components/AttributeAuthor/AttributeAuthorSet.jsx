import { defineComponent } from '@deip/platform-util';
import { AttributeSetMixin } from '@deip/attributes-module';

/**
 * Component for changing asset attribute
 */
export default defineComponent({
  name: 'AttributeAuthorSet',

  mixins: [AttributeSetMixin],

  methods: {
    /**
     * Generate changing asset field
     *
     * @param {Array} errors
     */
    genAttribute() {
      return null;
    }
  }
});
