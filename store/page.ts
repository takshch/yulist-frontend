import axios from 'axios'

const baseURL = '/mockapi'
const API = {
  pageByID: (id: number) => `${baseURL}/page/${id}.json`,
}

interface StateConfig {
  pages: Array<any>
}

export const state = (): StateConfig => ({
  pages: [],
})

export const mutations = {
  add(state: StateConfig, payload: object): void {
    console.log('add', payload)
    state.pages.push(payload)
  },
}

export const actions = {
  async load({ commit }: { commit: Function }, pageId: number) {
    try {
      const url = API.pageByID(pageId)
      const response = await axios.get(url)
      const page = response.data
      commit('add', page)
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {
  getPageById: (state: StateConfig) => (id: number) => {
    const page = state.pages.filter((page) => page.id === id)
    return page[0]
  },
}
