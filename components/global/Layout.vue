<template>
  <div class="page">
    <Header :is-white="isWhiteHeader" />

    <main class="page-content">
      <slot />
    </main>

    <Footer ref="footer" />

    <div ref="fixedEl" class="page-fixed" :style="{ color: currentColor }">
      <MainInfo />
    </div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainInfo from '@/components/MainInfo'
import { WindowEvents, WindowBreakpoints } from '@/config/constants'
import { mapGetters } from 'vuex'

const Colors = {
  White: 'var(--color-white)',
  Black: 'var(--color-black)'
}

export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
    MainInfo
  },
  props: {
    isWhiteHeader: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      footerPosition: null,
      fixedElPosition: null,
      currentColor: Colors.Black
    }
  },
  computed: {
    ...mapGetters({
      getMediaSize: 'getMediaSize'
    })
  },
  async mounted () {
    if (process.browser) {
      await this.$nextTick()
      this.initEvents()
    }
  },
  destroyed () {
    this.removeEvents()
  },
  methods: {
    initEvents () {
      if (this.getMediaSize === WindowBreakpoints.Desktop) {
        this.scrollEvent = throttle(150, () => this.changeColor())
        window.addEventListener(WindowEvents.Scroll, this.scrollEvent, false)
        this.changeColor()
      }
    },
    removeEvents () {
      if (this.scrollEvent) { window.removeEventListener(WindowEvents.Scroll, this.scrollEvent, false) }
    },
    changeColor () {
      this.footerPosition = this.$refs?.footer?.$el?.getBoundingClientRect()?.top
      this.fixedElPosition = this.$refs?.fixedEl?.getBoundingClientRect()?.top

      if (this.fixedElPosition > this.footerPosition) {
        this.currentColor = Colors.White
      } else {
        this.currentColor = Colors.Black
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$leftOffset: 10rem;
$bottomOffset: 6rem;

.page-fixed {
  display: none;
  position: fixed;
  left: $leftOffset;
  bottom: $bottomOffset;
  z-index: 1;
}

@include desktop {
  .page-fixed {
    display: block;
  }
}
</style>
