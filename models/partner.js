import { AppModelImage } from '@/models'
import { rawObject, rawArray, AppModel } from './_utils'

export default class AppModelPartners extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      body = '',
      imgs = []
    } = rawObject(raw)

    const mappedImgs = rawArray(imgs).map(item => AppModelImage.createFromRaw(item))

    return Object.assign(new AppModelPartners(), {
      title,
      body,
      imgs: mappedImgs
    })
  }
}
