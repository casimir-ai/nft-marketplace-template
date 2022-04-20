<template>
  <v-app-bar
    app
    fixed
    clipped-left
    class="app-bar"
    height="56"
  >
    <v-app-bar-title>
      <router-link
        :to="{ name: 'home' }"
        class="text-decoration-none text--primary d-block"
      >
        #NoWar🇺🇦
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <app-bar-user style="pointer-events: all" />
  </v-app-bar>
</template>

<script>
  import AppBarUser from '@/components/AppBar/AppBarUser';

  export default {
    name: 'AppBar',
    components: { AppBarUser }
  };
</script>

<style lang="scss" scoped>
  @use '@/styles/_vuetify-variables.scss' as vv;
  .app-bar {
    border-bottom: thin solid rgba(map-get(vv.$shades, 'black'), 0.12)
  }
</style>
