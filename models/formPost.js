import { rawObject, AppModel } from './_utils'

export default class AppFormPost extends AppModel {
  static createFromRaw (raw) {
    const {
      name = '',
      phone = '',
      email = ''
    } = rawObject(raw)

    return Object.assign(new AppFormPost(), {
      name,
      email,
      phone
    })
  }
}
