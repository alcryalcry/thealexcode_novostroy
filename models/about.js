import { AppModelImage } from '@/models'
import { rawObject, AppModel } from './_utils'

export default class AppModelAbout extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      body = '',
      alterImg = {},
      alterBody = ''
    } = rawObject(raw)

    return Object.assign(new AppModelAbout(), {
      title,
      body,
      alterImg: AppModelImage.createFromRaw(alterImg),
      alterBody
    })
  }
}
