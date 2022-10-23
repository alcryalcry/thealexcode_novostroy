import { AppModel } from '@/models'
import { rawObject } from '@/utils'

export default class AppModelFormPost extends AppModel {
  static createErrorsFromRaw (raw) {
    const {
      response = {}
    } = rawObject(raw)

    const {
      data = {}
    } = rawObject(response)

    const {
      error = {}
    } = rawObject(data)

    const {
      details = {}
    } = rawObject(error)

    const {
      errors: detailErrors = []
    } = rawObject(details)

    return detailErrors.reduce((acc, item) => {
      acc[item?.path[0]] = item.message
      return acc
    }, {})
  }
}
