import { rawArray, rawObject, rawImage } from './_utils'

export default function (raw = []) {
  return rawArray(raw).map((item) => {
    const {
      id = null,
      title = '',
      subtitle = '',
      year = null,
      location = '',
      img = {},
      inProgress = false,
      sort = null,
      slides = []
    } = rawObject(item)

    const mappedSlides = rawArray(slides).map((slide) => {
      const {
        img: slideImage = {},
        caption = ''
      } = rawObject(slide)
      return {
        slideImage: rawImage(slideImage),
        caption
      }
    })

    return {
      id,
      title,
      subtitle,
      year,
      location,
      img: rawImage(img),
      inProgress,
      sort,
      slides: mappedSlides
    }
  })
}
