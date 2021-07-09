import { AppImage } from '@/models'
import { rawObject, AppModel } from './_utils'
export default class AppAbout extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      body = '',
      alterImg = {},
      alterBody = ''
    } = rawObject(raw)

    return Object.assign(new AppAbout(), {
      title,
      body,
      alterImg: AppImage.createFromRaw(alterImg),
      alterBody
    })
  }
}
