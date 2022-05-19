<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { AppBar } from '@/components';

  export default {
    name: 'App',
    components: {
      AppBar
    },

    created() {
      this.$currentUser.await(() => {
        this.$store.dispatch('getCurrentUserProject');
      });
    }
  };
</script>
