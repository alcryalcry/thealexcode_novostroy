import { AppModelImage } from '@/models'
import { rawObject, AppModel } from './_utils'

export default class AppModelTeam extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      subtitle = '',
      body = '',
      img = '',
      alterImg = '',
      alterBody = ''
    } = rawObject(raw)

    return Object.assign(new AppModelTeam(), {
      title,
      subtitle,
      body,
      img: AppModelImage.createFromRaw(img),
      alterImg: AppModelImage.createFromRaw(alterImg),
      alterBody
    })
  }
}
