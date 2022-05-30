<template>
  <div>
    <slot :assets="assets" />

    <infinite-loading :identifier="infiniteScrollId" @infinite="getList">
      <template #spinner>
        <v-progress-circular
          indeterminate
          class="my-8"
        />
      </template>
      <template #no-more>
        {{ $t('components.assetsInfiniteList.noMore') }}
      </template>
    </infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name: 'AssetsInfiniteScroll',

    components: {
      InfiniteLoading
    },

    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      filter: {
        type: Object,
        default: undefined
      },
      sort: {
        type: Object,
        default: undefined
      }
    },

    data() {
      return {
        assets: [],
        page: 0,
        infiniteScrollId: +new Date()
      };
    },

    watch: {
      filter() {
        this.resetInfiniteScroll();
      },
      sort() {
        this.resetInfiniteScroll();
      }
    },

    methods: {
      async getList(scrollState) {
        const query = {
          page: this.page,
          pageSize: this.pageSize
        };

        if (this.filter) query.filter = this.filter;
        if (this.sort) query.sort = this.sort;

        try {
          const { items } = await this.$store.dispatch('projectContent/getListPaginated', query);
          if (items.length) {
            this.assets = this.assets.concat(items);
            const authorIds = this.assets.map((asset) => asset.authors[0]);
            const uniqueAuthorIds = Array.from(new Set(authorIds));
            await this.$store.dispatch('users/getList', uniqueAuthorIds);
            this.page++;
            scrollState.loaded();
          } else {
            scrollState.complete();
          }
        } catch (error) {
          console.error(error);
        }
      },

      resetInfiniteScroll() {
        this.page = 0;
        this.assets = [];
        this.infiniteScrollId += 1;
      }
    }
  };
</script>
