<template>
  <div v-if="page" class="page">
    <h1 class="page__heading">{{ page.name }}</h1>
    <div class="page__lists">
      <template v-for="(listId, index) in page.lists">
        <List :id="listId" :key="index" />
        <!-- <NuxtLink
          :to="`/list/${listId}`"
          :key="index"
          class="unstylize-href"
        >
        </NuxtLink> -->
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({ getPageById: 'page/getPageById' }),
    page(): object {
      const id = parseInt(this.$route.params.id, 10)
      const page = this.getPageById(id)
      return page || {}
    },
  },
  async mounted() {
    const id = this.$route.params.id
    await this.$store.dispatch('page/load', id)
  },
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
}

.page__lists {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
