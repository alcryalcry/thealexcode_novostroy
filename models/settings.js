import { rawObject, rawArray, rawImage } from './_utils'

export default function (raw = {}) {
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

  return {
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
    seoImage: rawImage(seoImage)
  }
}
