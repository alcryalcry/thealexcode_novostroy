import { rawImage, rawObject } from './_utils'

export default function (raw = {}) {
  const {
    title = '',
    body = '',
    alterImg = {},
    alterBody = ''
  } = rawObject(raw)

  return {
    title,
    body,
    alterImg: rawImage(alterImg),
    alterBody
  }
}
