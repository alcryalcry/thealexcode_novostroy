import { rawObject } from './_utils'

export default class AppImage {
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

    return Object.assign(new AppImage(), {
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
      previewUrl,
      thumbnail: thumbnail.url ? AppImage.createFromRaw(thumbnail) : {}
    })
  }
}
