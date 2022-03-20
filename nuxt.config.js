import { head } from './config'

export default {
  store: true,
  head,
  css: [
    '~assets/styles/app.scss',
    'aos/dist/aos.css'
  ],
  styleResources: {
    scss: [
      'assets/styles/global/vars.scss',
      'assets/styles/global/mixins.scss'
    ]
  },
  plugins: [
    {
      src: '~plugins/globalComponents.js',
      ssr: true
    },
    {
      src: '~plugins/aos.js',
      ssr: false
    },
    {
      src: '~plugins/localePlugin.js',
      ssr: true
    },
    {
      src: '~plugins/vueMarkdown.js',
      ssr: true
    },
    {
      src: '~plugins/vMask.js',
      ssr: false
    },
    {
      src: '~plugins/vueAwesomeSwiper.js',
      ssr: false
    },
    {
      src: '~plugins/vueClickaway.js',
      ssr: false
    },
    {
      src: '~plugins/vuelidate.js',
      ssr: false
    },
    {
      src: '~plugins/vBodyScrollLock.js',
      ssr: false
    },
    {
      src: '~plugins/vueMultiselect',
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
  },
  server: {
    host: '0.0.0.0',
    port: 4444
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4444',
    apiRoot: process.env.API_ROOT || 'http://localhost:4444'
  }
}
