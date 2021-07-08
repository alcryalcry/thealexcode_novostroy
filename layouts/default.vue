<template>
  <main>
    <Nuxt />
  </main>
</template>

<script>
import { debounce } from 'throttle-debounce'

export default {
  data () {
    return {
      mediaSize: 'desktop'
    }
  },
  mounted () {
    window.addEventListener('resize', debounce(250, () => {
      this.handleResize()
    }), false)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize, false)
  },
  methods: {
    handleResize () {
      const m = 768
      const t = 1024
      const d = Infinity
      if (window.innerWidth < m) {
        this.mediaSize = 'mobile'
      } else if (window.innerWidth >= m && window.innerWidth < t) {
        this.mediaSize = 'tablet'
      } else if (window.innerWidth >= t && window.innerWidth < d) {
        this.mediaSize = 'desktop'
      }
    }
  }
}
</script>
