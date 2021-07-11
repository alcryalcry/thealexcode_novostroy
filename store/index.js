import { fetchSettings } from '@/config/api'
import { AppModelSettings } from '@/models'

export const state = () => ({
  mediaSize: '',
  settings: {}
})

export const getters = {
  getMediaSize: (state) => {
    return state.mediaSize
  },
  getSettings: (state) => {
    return state.settings
  }
}

export const mutations = {
  setMediaSize (state, value) {
    state.mediaSize = value
  },
  setSettings (state, value) {
    state.settings = AppModelSettings.createFromRaw(value)
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    try {
      const req = await fetchSettings()
      await commit('setSettings', req)
    } catch (e) {
      console.error(e)
      commit('setSettings', {})
    }
  }
}
