import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './styles/app.scss';
import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';

import { CreateApp } from '@deip/platform-util';
import { ValidationPlugin } from '@deip/validation-plugin';
import { VuetifyExtended } from '@deip/vuetify-extended';
import { EnvModule } from '@deip/env-module';
import { ScopesModule } from '@casimir/scopes-module';
import { AttributesModule } from '@deip/attributes-module';
import { LayoutsModule } from '@deip/layouts-module';
import { AuthModule } from '@deip/auth-module';
import { UsersModule } from '@deip/users-module';
import { TeamsModule } from '@deip/teams-module';
import { ProjectsModule } from '@deip/projects-module';
import { ProjectContentModule } from '@deip/project-content-module';

import { NoWarAuthModule } from '@/modules/auth';
import { NoWarMarketplaceModule } from '@/modules/marketplace';
import { NoWarAdminModule } from '@/modules/admin';
import { NoWarProfileModule } from '@/modules/profile';

import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import router from '@/router';
import store from '@/store';
import App from '@/App';

Vue.config.productionTip = false;

const noWarApp = new CreateApp(Vue, {
  vuetify,
  i18n,
  router,
  store
});

const usersModuleOptions = {
  attributesMappedKeys: [
    { key: 'name', label: 'Name', allowedTypes: ['text'] },
    { key: 'email', label: 'Email', allowedTypes: ['text'] }
  ]
};

noWarApp
  .addModule(EnvModule)

  .addModule(ValidationPlugin)
  .addModule(VuetifyExtended, { vuetify })

  .addModule(ScopesModule)
  .addModule(AttributesModule)
  .addModule(LayoutsModule)
  .addModule(AuthModule)
  .addModule(UsersModule, usersModuleOptions)
  .addModule(TeamsModule)
  .addModule(ProjectsModule)
  .addModule(ProjectContentModule)

  .addModule(NoWarAuthModule)
  .addModule(NoWarMarketplaceModule)
  .addModule(NoWarAdminModule)
  .addModule(NoWarProfileModule)

  .bootstrap()

  .then(() => {
    const app = new Vue({
      vuetify,
      i18n,
      router,
      store,
      render: (h) => h(App)
    });

    app.$mount('#app');
  });
