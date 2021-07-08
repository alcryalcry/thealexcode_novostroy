export const rawObject = raw => typeof raw === 'object' && raw !== null ? raw : {}

export const rawArray = raw => Array.isArray(raw) ? raw : []

export const rawArrayOfStrings = raw => Array.isArray(raw) ? raw.map(item => String(item)) : []

export const rawImage = (raw = {}) => {
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

  return {
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
    thumbnail: thumbnail.url ? rawImage(thumbnail) : {}
  }
}
