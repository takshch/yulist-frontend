<template>

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted() {
    await this.$store.dispatch('user/load')
    const { pages } = this.$store.getters['user/getUser']
    const path = `/page/${pages[0]}`
    this.$router.push({
      path,
    })
  },
})
</script>
