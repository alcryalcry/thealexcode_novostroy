import { rawImage, rawObject } from './_utils'

export default function (raw = {}) {
  const {
    title = '',
    subtitle = '',
    body = '',
    img = '',
    alterImg = '',
    alterBody = ''
  } = rawObject(raw)

  return {
    title,
    subtitle,
    body,
    img: rawImage(img),
    alterImg: rawImage(alterImg),
    alterBody
  }
}
