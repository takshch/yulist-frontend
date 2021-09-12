<template>
  <div class="list" v-if="list">
    <div class="list__header">{{ list.name }}</div>
    <div class="list__body">
      <ol class="list__section">
        <li v-for="(item, index) in list.items" :key="index">{{ item }}</li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  props: {
    id: {
      type: Number,
      default: 1,
    },
  },
  async mounted() {
    const id = this.$props.id
    await this.$store.dispatch('list/load', id)
  },
  computed: {
    ...mapGetters({ getListById: 'list/getListById' }),
    list(): object {
      return this.getListById(this.$props.id)
    },
  },
})
</script>

<style>
.list {
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  width: 12em;
  border-radius: 4px;
  margin: 15px 10px;
}

.list__header {
  padding: 10px 5px;
  border-bottom: 1px solid black;
  text-align: center;
}

.list__body {
  padding: 5px 5px 0 0px;
}

.list__section {
  padding-left: 1.6em;
}

.list__item {
  margin: 4px 0;
}
</style>
