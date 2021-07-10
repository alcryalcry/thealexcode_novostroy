export const HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

export const SITE_TITLE = 'nvstr-frontend'

export const THEME_COLOR = '#000000'

export const API_ROOT = process.env.API_ROOT || ''

export const getAbsolutePath = url => String(API_ROOT).replace(/\/?$/, '/') + String(url).replace(/^\/|\/$/g, '')

export const API_ROUTES = {
  about: 'about',
  partners: 'partners',
  projects: 'projects',
  team: 'team',
  settings: 'settings'
}

export const ROUTES = {
  projects: '/projects'
}
