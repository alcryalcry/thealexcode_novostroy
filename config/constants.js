export const THEME_COLOR = '#000000'

export const API_ROOT = process.env.apiRoot || 'http://localhost:3000'

export const SELECT_DEFAULT_ID = 'SELECT_DEFAULT_ID_PLACEHOLDER'

export const PROJECTS_GROUP_KEY = 'inProgress'

export const getYMapsUrl = url => `https://yandex.ru/maps/?text=${encodeURIComponent(url)}`

export const decimal = num => new Intl.NumberFormat('nu', { style: 'decimal', minimumIntegerDigits: 2 }).format(num)

export const getAbsolutePath = url => String(API_ROOT).replace(/\/?$/, '/') + String(url).replace(/^\/|\/$/g, '')

export const groupByKey = (list, key) => list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})

export const WindowEvents = {
  Resize: 'resize',
  Scroll: 'scroll'
}

export const WindowBreakpoints = {
  Desktop: 'desktop',
  Tablet: 'tablet',
  Mobile: 'mobile'
}

export const ApiRoutes = {
  About: 'about',
  Partners: 'partners',
  Projects: 'projects',
  Team: 'team',
  Settings: 'settings',
  Feedback: 'feedbacks'
}

export const RouteNames = {
  Main: 'index',
  Projects: 'projects'
}

export const RouteMap = [
  {
    label: 'Все проекты',
    routeName: RouteNames.Projects,
    anchor: null
  },
  {
    label: 'Оставить заявку',
    routeName: null,
    anchor: '#form'
  }
]

export const pageHead = (title = '', description = '', image = '') => {
  return {
    title,
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: image
      }
    ]
  }
}
