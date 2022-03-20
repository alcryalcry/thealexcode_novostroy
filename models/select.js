import { AppModel } from '@/models'
import { rawObject, rawArray } from '@/utils'

export default class AppModelSelect extends AppModel {
  static createFromRaw (raw, index) {
    const str = typeof raw === 'string' || typeof raw === 'number' ? raw : index

    const {
      id = str,
      label = str
    } = rawObject(raw)

    return Object.assign(new AppModelSelect(), {
      id,
      label
    })
  }

  static createListFromRaw (rawList) {
    return rawArray(rawList).map((item, index) => this.createFromRaw(item, index + 1))
  }
}
