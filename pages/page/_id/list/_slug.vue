<template>
  <div>Hello World</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  async mounted() {
    const id = this.$route.params.slug
    await this.$store.dispatch('list/load', id)
  },
  computed: {
    ...mapGetters({ getPageById: 'list/getListById' }),
    list(): object {
      const id = parseInt(this.$route.params.slug, 10)
      const list = this.getListById(id)
      return list ? list : {}
    },
  },
})
</script>

<style>
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
