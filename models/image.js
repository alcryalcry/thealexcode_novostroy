import { getAbsolutePath } from '@/config/constants'
import { rawObject } from '@/utils'

export default class AppModelImage {
  static createFromRaw (raw) {
    const {
      id = null,
      name = '',
      alternativeText = '',
      caption = '',
      width = null,
      height = null,
      hash = '',
      ext = '',
      mime = '',
      url = '',
      previewUrl = '',
      formats = {}
    } = rawObject(raw)

    const {
      thumbnail = {}
    } = rawObject(formats)

    return Object.assign(new AppModelImage(), {
      id,
      name,
      alternativeText,
      caption,
      width,
      height,
      hash,
      ext,
      mime,
      url,
      absoluteUrl: getAbsolutePath(url),
      previewUrl,
      thumbnail: thumbnail.url ? AppModelImage.createFromRaw(thumbnail) : {}
    })
  }
}
