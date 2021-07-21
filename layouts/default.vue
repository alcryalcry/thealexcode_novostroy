<template>
  <main>
    <Nuxt />
  </main>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { mapMutations } from 'vuex'
import { WindowBreakpoints, WindowEvents } from '@/config/constants'

export default {
  mounted () {
    if (process.browser) {
      window.addEventListener(WindowEvents.Resize, debounce(250, () => {
        this.handleResize()
      }), false)
      this.handleResize()
    }
  },
  beforeDestroy () {
    window.removeEventListener(WindowEvents.Resize, this.handleResize, false)
  },
  methods: {
    ...mapMutations({
      setMediaSize: 'setMediaSize'
    }),
    handleResize () {
      const m = 768
      const t = 1024
      const d = Infinity
      if (window.innerWidth < m) {
        this.setMediaSize(WindowBreakpoints.Mobile)
      } else if (window.innerWidth >= m && window.innerWidth < t) {
        this.setMediaSize(WindowBreakpoints.Tablet)
      } else if (window.innerWidth >= t && window.innerWidth < d) {
        this.setMediaSize(WindowBreakpoints.Desktop)
      }
    }
  }
}
</script>
