import axios from 'axios'

const baseURL = '/mockapi'
const API = {
  listByID: (id: number) => `${baseURL}/list/${id}.json`,
}
interface StateConfig {
  lists: Array<any>
}

export const state = (): StateConfig => ({
  lists: [],
})

export const mutations = {
  add(state: StateConfig, payload: object): void {
    state.lists.push(payload)
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
}

export const getters = {
  getListById: (state: StateConfig) => (id: number) => {
    const list = state.lists.filter((list) => list.id === id)
    return list[0]
  },
}
