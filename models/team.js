import { AppImage } from '@/models'
import { rawObject, AppModel } from './_utils'

export default class AppTeam extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      subtitle = '',
      body = '',
      img = '',
      alterImg = '',
      alterBody = ''
    } = rawObject(raw)

    return Object.assign(new AppTeam(), {
      title,
      subtitle,
      body,
      img: AppImage.createFromRaw(img),
      alterImg: AppImage.createFromRaw(alterImg),
      alterBody
    })
  }
}
