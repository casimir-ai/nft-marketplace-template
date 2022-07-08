import { defineComponent } from '@deip/platform-util';
import { AttributeReadMixin } from '@deip/attributes-module';

/**
 * Component for read asset attribute
 */
export default defineComponent({
  name: 'AttributeAuthorRead',

  mixins: [AttributeReadMixin],

  computed: {
    user() {
      if (!this.value) return null;
      return this.$store.getters['users/one'](this.value);
    },

    userName() {
      if (!this.user?.attributes) return null;

      return this.$attributes
        .getMappedData('user.name', this.user.attributes)?.value;
    }
  },
  methods: {
    /**
     * Generate attribute for read only
     */
    genAttribute() {
      return (
        <span>{ this.userName }</span>
      );
    }
  }
});
