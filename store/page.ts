import axios from 'axios'
import Vue from 'vue'
import Page from '~/types/Page'

const baseURL = 'http://localhost:5000'
const API = {
  pageByID: (id: number) => `${baseURL}/pages/${id}`,
}

interface StateConfig {
  pages: Array<Page>
}

export const state = (): StateConfig => ({
  pages: [],
})

export const mutations = {
  add(state: StateConfig, page: Page): void {
    Vue.set(state.pages, page.id, page)
  },
  editLists(
    state: StateConfig,
    { pageId, lists }: { pageId: number; lists: number[] }
  ): void {
    console.log('editLists')
    const page = Object.assign(state.pages[pageId], { lists });
    state.pages[pageId] = page;
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
      console.error(e)
    }
  },
  async deleteList(
    { state, commit }: { state: StateConfig; commit: Function },
    { pageId, listId }: { pageId: number; listId: number }
  ) {
    try {
      console.log('deleteList')
      const url = API.pageByID(pageId)
      console.log('page', state.pages[pageId]);
      const lists: number[] = state.pages[pageId].lists.filter(
        (id) => id !== listId
      )
      console.log('lists', lists)

      await axios.patch(url, {
        lists,
      })
      console.log('deleteList done')
      commit('editLists', { pageId, lists })
    } catch (e) {
      console.error(e)
    }
  },
}

export const getters = {
  getPageById: (state: StateConfig) => (id: number) => {
    const page = state.pages[id]
    return page;
  },
}
