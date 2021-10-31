import axios from 'axios'
import Vue from 'vue'
import List from '../types/List';

const baseURL = 'http://localhost:5000';
const API = {
  listByID: (id: number) => `${baseURL}/lists/${id}`,
}

interface StateConfig {
  lists: Array<List>
}

export const state = (): StateConfig => ({
  lists: [],
})

export const mutations = {
  add(state: StateConfig, payload: List): void {
    Vue.set(state.lists, payload.id, payload)
  },
  edit(state: StateConfig, { changes, id }: { changes: List; id: number }): void {
    const list = state.lists[id]
    for(const prop of Object.keys(changes)) {
      (list as any)[prop] = (changes as any)[prop];
    }
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
    { changes, id } : {
      changes: List,
      id: number,
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
}

export const getters = {
  getListById: (state: StateConfig) => (id: number) => {
    const list = state.lists.filter((list) => list.id === id)
    return list[0]
  },
}
