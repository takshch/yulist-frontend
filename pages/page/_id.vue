<template>
  <div v-if="page" class="page">
    <h1 class="page__heading">
      <div class="page__name">
        {{ page.name }}
      </div>
      <div class="page__options">
        <div class="page__option" @click="createList">
          <Icon icon="clarity:add-line" :inline=true />
        </div>
      </div>
    </h1>
    <div class="page__lists">
      <template v-for="(listId, index) in page.lists">
        <List :id="listId" :key="index" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex'
import Page from '~/types/Page'

export default Vue.extend({
  components: {
    Icon,
  },
  computed: {
    ...mapGetters({ getPageById: 'page/getPageById' }),
    page(): Page {
      const id = parseInt(this.$route.params.id, 10)
      const page = this.getPageById(id)
      console.log(page);
      return page || {}
    },
  },
  async mounted() {
    const id = this.$route.params.id
    await this.$store.dispatch('page/load', id)
  },
  methods: {
    async createList() {
      const page = this.page;
      const list = await this.$store.dispatch('list/add', {
        pageId: page.id,
        userId: page.userId,
      });
      await this.$store.dispatch('page/addList', {
        pageId: page.id,
        listId: list.id
      });
    },
  }
})
</script>

<style>
.unstylize-href {
  text-decoration: none;
  color: unset;
}

.page {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.page__heading {
  display: flex;
  flex-direction: column;
}

.page__options {
  display: flex;
  justify-content: center;
}

.page__option {
  cursor: pointer;
}

.page__lists {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
