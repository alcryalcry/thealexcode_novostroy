export const HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

export const SITE_TITLE = 'nvstr-frontend'

export const THEME_COLOR = '#000000'

export const API_ROOT = process.env.API_ROOT || ''

export const getAbsolutePath = url => String(API_ROOT).replace(/\/?$/, '/') + String(url).replace(/^\/|\/$/g, '')

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
  Settings: 'settings'
}

export const RouteNames = {
  Main: 'index',
  Projects: 'projects'
}

export const RouteMap = [
  {
    label: 'Главная',
    routeName: RouteNames.Main,
    anchor: null
  },
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
