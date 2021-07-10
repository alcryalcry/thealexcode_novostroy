import { AppModel, AppModelImage } from '@/models'
import { rawArray, rawObject } from '@/utils'

export default class AppModelProject extends AppModel {
  static createFromRaw (raw) {
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
    } = rawObject(raw)

    const mappedSlides = rawArray(slides).map((slide) => {
      const {
        img: slideImage = {},
        caption = ''
      } = rawObject(slide)

      return {
        slideImage: AppModelImage.createFromRaw(slideImage),
        caption
      }
    })

    return Object.assign(new AppModelProject(), {
      id,
      title,
      subtitle,
      year,
      location,
      img: AppModelImage.createFromRaw(img),
      inProgress,
      sort,
      slides: mappedSlides
    })
  }
}
