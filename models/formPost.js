import { AppModel } from '@/models'
import { rawObject, rawArray } from '@/utils'

export default class AppModelFormPost extends AppModel {
  static createErrorsFromRaw (raw) {
    const {
      response = {}
    } = rawObject(raw)

    const {
      data = {}
    } = rawObject(response)

    const {
      data: dataErrors = {}
    } = rawObject(data)

    const {
      errors = {}
    } = rawObject(dataErrors)

    const {
      name = [],
      phone = [],
      email = []
    } = rawObject(errors)

    return Object.assign(new AppModelFormPost(), {
      name: rawArray(name)[0],
      email: rawArray(email)[0],
      phone: rawArray(phone)[0]
    })
  }
}
