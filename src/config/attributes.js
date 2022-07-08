import { AttributeScope } from '@casimir/platform-core';
import { AttributeAuthorSet, AttributeAuthorRead } from '../components/AttributeAuthor';

export const authorAttributes = [
  {
    type: 'author',
    valueType: ['string'],
    label: 'Author',
    icon: 'mdi-account',
    validateRule: 'required',
    components: {
      read: { component: AttributeAuthorRead },
      set: { component: AttributeAuthorSet }
    },
    scopes: [AttributeScope.NFT_ITEM]
  }
];

export const authorComponents = { AttributeAuthorRead, AttributeAuthorSet };
