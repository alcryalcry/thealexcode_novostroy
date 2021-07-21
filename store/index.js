import { fetchSettings, fetchProjects } from '@/config/api'
import { AppModelSettings, AppModelProject } from '@/models'

export const state = () => ({
  mediaSize: '',
  settings: {},
  projects: []
})

export const getters = {
  getMediaSize: (state) => {
    return state.mediaSize
  },
  getSettings: (state) => {
    return state.settings
  },
  getProjects: (state) => {
    return state.projects
  }
}

export const mutations = {
  setMediaSize (state, value) {
    state.mediaSize = value
  },
  setSettings (state, value) {
    state.settings = AppModelSettings.createFromRaw(value)
  },
  setProjects (state, value) {
    state.projects = AppModelProject.createListFromRaw(value)
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    try {
      const [
        settings,
        projects
      ] = await Promise.all([
        fetchSettings(),
        fetchProjects()
      ])
      commit('setSettings', settings)
      commit('setProjects', projects)
    } catch (e) {
      console.error(e)
      commit('setSettings', {})
      commit('setProjects', [])
    }
  }
}
