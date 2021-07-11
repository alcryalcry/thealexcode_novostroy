<template>
  <main>
    <Nuxt />
  </main>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { mapMutations } from 'vuex'

export default {
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
    ...mapMutations({
      setMediaSize: 'setMediaSize'
    }),
    handleResize () {
      const m = 768
      const t = 1024
      const d = Infinity
      if (window.innerWidth < m) {
        this.setMediaSize('mobile')
      } else if (window.innerWidth >= m && window.innerWidth < t) {
        this.setMediaSize('tablet')
      } else if (window.innerWidth >= t && window.innerWidth < d) {
        this.setMediaSize('desktop')
      }
    }
  }
}
</script>
