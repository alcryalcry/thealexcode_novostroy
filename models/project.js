import { AppModel, AppModelImage } from '@/models'
import { rawArray, rawObject } from '@/utils'
import { RouteNames } from '@/config/constants'

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

    const mappedSlides = rawArray(slides).map((slide, index) => AppModelProject.createSlideFromRaw(slide, index))

    return Object.assign(new AppModelProject(), {
      id,
      title,
      subtitle,
      year,
      location,
      img: AppModelImage.createFromRaw(img),
      relativeUrl: `${RouteNames.Projects}/${id}`,
      inProgress,
      sort,
      slides: mappedSlides
    })
  }

  static createSlideFromRaw (raw, index = 1) {
    const {
      img: slideImg = {},
      caption = ''
    } = rawObject(raw)

    return {
      id: index,
      img: AppModelImage.createFromRaw(slideImg),
      caption
    }
  }
}
