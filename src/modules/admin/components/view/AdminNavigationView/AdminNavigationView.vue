<template>
  <div>
    <admin-navigation />
    <router-view />
  </div>
</template>

<script>
  import { routerView } from '@casimir/platform-util';

  import { AdminNavigation } from '@/modules/admin/components/view/AdminNavigation';

  export default {
    name: 'AdminNavigationView',
    components: {
      AdminNavigation,
      routerView
    }
  };
</script>
