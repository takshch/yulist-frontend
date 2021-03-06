import axios from 'axios'
import Vue from 'vue'
import List from '../types/List'

const baseURL = 'http://localhost:5000'
const API = {
  listByID: (id: number) => `${baseURL}/lists/${id}`,
  newList: `${baseURL}/lists`,
}

interface StateConfig {
  lists: Array<List>
}

export const state = (): StateConfig => ({
  lists: [],
})

export const mutations = {
  add(state: StateConfig, list: List): void {
    Vue.set(state.lists, list.id, list)
  },
  edit(
    state: StateConfig,
    { changes, id }: { changes: List; id: number }
  ): void {
    const list = state.lists[id]
    for (const prop of Object.keys(changes)) {
      ;(list as any)[prop] = (changes as any)[prop]
    }
  },
  delete(state: StateConfig, id: number) {
    state.lists.splice(id, 1)
  },
}

export const actions = {
  async load({ commit }: { commit: Function }, listId: number) {
    try {
      const url = API.listByID(listId)
      const response = await axios.get(url)
      const list = response.data
      commit('add', list)
    } catch (e) {
      console.error(e)
    }
  },
  async edit(
    { commit }: { commit: Function },
    {
      changes,
      id,
    }: {
      changes: List
      id: number
    }
  ): Promise<void> {
    try {
      const url = API.listByID(id)
      await axios.patch(url, changes)
      commit('edit', { changes, id })
    } catch (e) {
      console.error(e)
    }
  },
  async delete({ commit }: { commit: Function }, id: number) {
    try {
      const url = API.listByID(id)
      await axios.delete(url)
      commit('delete', id)
    } catch (e) {}
  },
  async add(
    { commit }: { commit: Function },
    { pageId, userId }: { pageId: number; userId: number }
  ) {
    const _list = {
      name: 'New List',
      items: ['write your items here...'],
      userId,
      pageId,
      createdAt: '',
      modifiedAt: '',
    }
    try {
      const url = API.newList
      const response = await axios.post(url, _list)
      const list = response.data
      commit('add', list)
      return list;
    } catch (e) {
      console.error(e)
    }
  },
}

export const getters = {
  getListById: (state: StateConfig) => (id: number) => {
    const list = state.lists.filter((list) => list.id === id)
    return list[0]
  },
}
