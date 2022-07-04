<template>
  <v-app>
    <app-bar :loading="loading" />
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

    data() {
      return {
        loading: false
      };
    },

    created() {
      this.getNftCollection();
    },

    methods: {
      async getNftCollection() {
        this.loading = true;
        try {
          this.$currentUser.await(() => {
            this.$store.dispatch('getCurrentUserNftCollection');
            this.loading = false;
          });
        } catch (error) {
          console.error(error);
        }
      }

    }

  };
</script>
