import { AppImage } from '@/models'
import { rawArray, rawObject, AppModel } from './_utils'

export default class AppProject extends AppModel {
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
        slideImage: AppImage.createFromRaw(slideImage),
        caption
      }
    })

    return Object.assign(new AppProject(), {
      id,
      title,
      subtitle,
      year,
      location,
      img: AppImage.createFromRaw(img),
      inProgress,
      sort,
      slides: mappedSlides
    })
  }
}
