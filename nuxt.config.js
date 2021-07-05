import { head } from './config'

export default {
  store: false,
  head,
  css: [
    '~assets/scss/app.scss'
  ],
  styleResources: {
    scss: [
      'assets/scss/global/mixins.scss',
      'assets/scss/global/vars.scss'
    ]
  },
  plugins: [
    {
      src: '~plugins/vBodyScrollLock.js',
      ssr: false
    }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  modules: [
  ],
  build: {
    extend (config) {
      // SVG Loader
      config.module.rules
        .filter(r => r.test.toString().includes('svg'))
        .forEach((r) => {
          r.test = /\.(png|jpe?g|gif)$/
        })
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    }
  }
}
