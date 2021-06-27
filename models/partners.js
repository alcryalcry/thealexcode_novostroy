import { rawObject, rawArray, rawImage } from './_utils'

export default function (raw = {}) {
  const {
    title = '',
    body = '',
    imgs = []
  } = rawObject(raw)

  const mappedImgs = rawArray(imgs).map(item => rawImage(item))

  return {
    title,
    body,
    imgs: mappedImgs
  }
}
