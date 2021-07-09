import { AppImage } from '@/models'
import { rawObject, rawArray, AppModel } from './_utils'

export default class AppPartners extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      body = '',
      imgs = []
    } = rawObject(raw)

    const mappedImgs = rawArray(imgs).map(item => AppImage.createFromRaw(item))

    return Object.assign(new AppPartners(), {
      title,
      body,
      imgs: mappedImgs
    })
  }
}
