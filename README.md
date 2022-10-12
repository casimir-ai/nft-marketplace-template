# nft-marketplace-template

## Local Development

1. See the [repo](https://github.com/casimir-ai/nft-marketplace-template-docker) with docker template configuration. Go through the ["Frontend development on local environment"](https://github.com/casimir-ai/nft-marketplace-template-docker#frontend-development-on-local-environment) section

2. Start the application in dev mode using the [local config](https://github.com/casimir-ai/nft-marketplace-template/blob/main/config/.local.env):

``` bash
DEIP_CONFIG=local npm run start
```

3. If you need to work with [Casimir packages](https://github.com/casimir-ai/frontend) that the application depends on, you can link your local Casimir packages repo by running the following command. This will allow you to develop both [Casimir packages](https://github.com/casimir-ai/frontend) repo and [NFT Marketplace app](https://github.com/casimir-ai/nft-marketplace-template) repo locally without packages re-publishing.

``` bash
npm run linkModules
```

---

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
