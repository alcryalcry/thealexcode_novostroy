import { AppModel, AppModelImage } from '@/models'
import { rawObject, rawArray } from '@/utils'
import { getYMapsUrl } from '@/config/constants'
export default class AppModelSettings extends AppModel {
  static createFromRaw (raw) {
    const {
      title = '',
      phone = '',
      copyright = '',
      contactName = '',
      addressName = '',
      contactList = [],
      addressList = [],
      seoMainTitle = '',
      seoMainDescription = '',
      seoProjectsTitle = '',
      seoProjectsDescription = '',
      seoImage = {}
    } = rawObject(raw)

    const mappedContactList = rawArray(contactList).map((item) => {
      const {
        id = '',
        text = ''
      } = rawObject(item)
      return {
        id,
        text
      }
    })

    const mappedAddressList = rawArray(addressList).map((item) => {
      const {
        id = '',
        text = ''
      } = rawObject(item)
      return {
        id,
        text,
        url: getYMapsUrl(text)
      }
    })

    return Object.assign(new AppModelSettings(), {
      title,
      phone,
      copyright,
      contactName,
      addressName,
      contactList: mappedContactList,
      addressList: mappedAddressList,
      seoMainTitle,
      seoMainDescription,
      seoProjectsTitle,
      seoProjectsDescription,
      seoImage: AppModelImage.createFromRaw(seoImage)
    })
  }
}
