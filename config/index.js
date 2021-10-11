import {
  THEME_COLOR
} from './constants'

export const head = {
  titleTemplate: '%s',
  meta: [
    {
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    },
    {
      name: 'msapplication-TileColor',
      content: THEME_COLOR
    },
    {
      name: 'theme-color',
      content: THEME_COLOR
    }
  ],
  link: []
}
