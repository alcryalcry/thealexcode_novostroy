import { AppImage } from '@/models'
import { rawObject, rawArray, AppModel } from './_utils'

export default class AppSettings extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      phone = '',
      copyright = '',
      contactName = '',
      addressName = '',
      contactsList = [],
      addressesList = [],
      seoMainTitle = '',
      seoMainDescription = '',
      seoProjectsTitle = '',
      seoProjectsDescription = '',
      seoImage = {}
    } = rawObject(raw)

    const mappedContactsList = rawArray(contactsList).map((item) => {
      const {
        id = '',
        text = ''
      } = rawObject(item)
      return {
        id,
        text
      }
    })

    const mappedAddressesList = rawArray(addressesList).map((item) => {
      const {
        id = '',
        text = ''
      } = rawObject(item)
      return {
        id,
        text
      }
    })

    return Object.assign(new AppSettings(), {
      title,
      phone,
      copyright,
      contactName,
      addressName,
      contactsList: mappedContactsList,
      addressesList: mappedAddressesList,
      seoMainTitle,
      seoMainDescription,
      seoProjectsTitle,
      seoProjectsDescription,
      seoImage: AppImage.createFromRaw(seoImage)
    })
  }
}
