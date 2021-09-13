import axios from 'axios'

const baseURL = '/mockapi'
const API = {
  user: () => `${baseURL}/user.json`,
}

interface StateConfig {
  name: string | null
  id: number | null
  pages: Array<any>
}

export const state = (): StateConfig => ({
  name: null,
  id: null,
  pages: [],
})

export const mutations = {
  add(state: StateConfig, payload: StateConfig): void {
    const { name, id, pages }: StateConfig = payload
    state.name = name
    state.id = id
    state.pages.push(pages)
  },
}

export const actions = {
  async load({ commit }: { commit: Function }) {
    try {
      const url = API.user()
      const response = await axios.get(url)
      const user = response.data
      commit('add', user)
    } catch (e) {
      console.error(e)
    }
  },
}

export const getters = {
  getUser: (state: StateConfig) => ({ ...state }),
}
