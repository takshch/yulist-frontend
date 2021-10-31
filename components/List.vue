<template>
  <div v-if="list" class="list">
    <div v-if="isLoading" class="list__loading"></div>
    <div
      class="list__header"
    >
      <div
        class="list__name"
        contenteditable=""
        @input="changeName"
        @blur="saveName"
      >
        {{ list.name }}
      </div>
      <div class="list__options">
        <div @click="toggleShowOptions">
          <Icon
            icon="clarity:ellipsis-vertical-line"
            :inline=true
          />
        </div>
      </div>
    </div>
    <button v-if="hasItemsChanged" class="list__option" @click="saveChangedItems">
      Save
    </button>
    <div class="list__body">
      <div v-if="shouldShowOptions" class="list__actions">
        <button @click="deleteList">Delete</button>
      </div>
      <ol v-else class="list__section">
        <li
          v-for="(item, index) in list.items"
          :key="index"
          :data-item-index="index"
          class="list__item"
          contenteditable=""
          @input="saveItem"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex'
import List from '../types/List'

export default Vue.extend({
  components: {
    Icon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      hasItemsChanged: false,
      isLoading: false,
      shouldShowOptions: false,
    }
  },
  computed: {
    ...mapGetters({ getListById: 'list/getListById' }),
    list(): List {
      return this.getListById(this.$props.id)
    },
  },
  async created() {
    const id = this.$props.id
    await this.$store.dispatch('list/load', id)
  },
  methods: {
    toggleShowOptions() {
      this.$data.shouldShowOptions = !this.$data.shouldShowOptions;
    },
    saveItem(e: any) {
      const id = e.target.dataset.itemIndex
      const value = e.target.textContent

      Vue.set(this.$data.items, id, value)
      this.$data.hasItemsChanged = true
    },
    async saveChangedItems() {
      this.$data.hasItemsChanged = false
      this.$data.isLoading = true

      const items = this.list.items.map((value, index) => {
        const item = this.items[index]
        if (item) return item
        return value
      })

      await this.$store.dispatch('list/edit', {
        changes: {
          items,
        },
        id: this.list.id,
      })

      this.$data.isLoading = false
    },
    changeName(e: any) {
      const value = e.target.textContent
      this.$data.name = value
    },
    async saveName() {
      this.$data.isLoading = true

       await this.$store.dispatch('list/edit', {
        changes: {
          name: this.$data.name,
        },
        id: this.list.id,
      })

      this.$data.isLoading = false
    },
    async deleteList(e: any) {
      e.stopPropagation();
      this.$data.isLoading = true
      const { id, pageId } = this.list;

      await this.$store.dispatch('list/delete', id);
      await this.$store.dispatch('page/deleteList', {
        pageId,
        listId: id,
      });

      this.$data.isLoading = false
      this.$data.shouldShowOptions = false;
    }
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
  color: black;
  box-shadow: 2px 2px 4px -1px #dddddd, -2px -2px 4px -1px #dddddd;
  background: #fff;
  position: relative;
}

.list__loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  z-index: 1;
}

.list__header {
  padding: 10px 5px;
  border-bottom: 1px solid #d1d1d1;
  text-align: center;
  color: #023047;
  font-weight: bold;
  display: flex;
  flex-wrap: nowrap;
}

.list__name {
  cursor: pointer;
  margin: 0 auto;
}

.list__options {
  cursor: pointer;
}

.list__option {
  width: 100%;
  height: 2em;
  border: none;
  background: #58cced;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #d1d1d1;
}

.list__option:hover {
  background: #890d15;
}

.list__body {
}

.list__actions {
  display: flex;
  flex-direction: column;
  margin: 1em;
}

.list__section {
  padding: 5px 5px 0 0;
  padding-left: 1.6em;
  cursor: pointer;
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
