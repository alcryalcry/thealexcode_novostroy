import Vue from 'vue'
import locale from '@/config/locale'

export default ({ app }, inject) => {
  inject('locale', Vue.observable(locale))
}
