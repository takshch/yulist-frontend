<template>
  <div v-if="list" class="list">
    <div class="list__header">{{ list.name }}</div>
    <div class="list__body">
      <ol class="list__section">
        <li
          v-for="(item, index) in list.items"
          :key="index"
          class="list__item"
          contenteditable=""
        >
          {{ item }}
        </li>
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
      required: true,
    },
  },
  computed: {
    ...mapGetters({ getListById: 'list/getListById' }),
    list(): object {
      return this.getListById(this.$props.id)
    },
  },
  async created() {
    const id = this.$props.id
    await this.$store.dispatch('list/load', id)
  },
})
</script>

<style>
.list {
  display: flex;
  flex-direction: column;
  border: 1px solid #d1d1d1;
  width: 12em;
  border-radius: 4px;
  margin: 15px 10px;
  cursor: pointer;
  color: black;
  box-shadow: 2px 2px 4px -1px #dddddd, -2px -2px 4px -1px #dddddd;
  background: #fff;
}

.list__header {
  padding: 10px 5px;
  border-bottom: 1px solid #d1d1d1;
  text-align: center;
  color: #023047;
  font-weight: bold;
}

.list__body {
  padding: 5px 5px 0 0px;
}

.list__section {
  padding-left: 1.6em;
}

.list__item {
  margin: 6px 0;
  color: #023047;
}

.list__item:focus {
  outline: none;
}

.list__item::marker {
  color: #d00000;
}
</style>
