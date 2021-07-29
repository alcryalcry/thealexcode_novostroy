<template>
  <div class="page" :class="{ 'is-menu-open': getHeaderStatus, 'is-page-disable': isPageDisable }">
    <div class="page-header">
      <Header :is-white="isWhiteHeader" :is-sticky="isStickyHeader" />
    </div>

    <main class="page-content">
      <slot />
      <div ref="fixedEl" class="page-fixed" :style="{ color: currentColor }">
        <MainInfo />
      </div>
    </main>

    <div ref="footer" class="page-footer">
      <Footer />
    </div>

    <div class="page-overlay" />
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainInfo from '@/components/MainInfo'
import { WindowEvents, WindowBreakpoints } from '@/config/constants'
import { mapGetters, mapMutations } from 'vuex'

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
      isPageDisable: false,
      isStickyHeader: false,
      footerPosition: null,
      fixedElPosition: null,
      currentColor: Colors.Black
    }
  },
  computed: {
    ...mapGetters({
      getPopupHoverStatus: 'getPopupHoverStatus',
      getHeaderStatus: 'getHeaderStatus',
      getMediaSize: 'getMediaSize'
    })
  },
  watch: {
    $router: {
      handler () {
        this.setPopupHoverStatus(false)
        this.setHeaderStatus(false)
      }
    },
    getPopupHoverStatus (val) {
      setTimeout(() => {
        this.isPageDisable = val
      }, 500)
    }
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
    ...mapMutations({
      setPopupHoverStatus: 'setPopupHoverStatus',
      setHeaderStatus: 'setHeaderStatus'
    }),
    initEvents () {
      this.resizeEvent = throttle(150, () => this.setViewBoxHeight())
      window.addEventListener(WindowEvents.Resize, this.setViewBoxHeight, false)
      this.setViewBoxHeight()

      if (this.getMediaSize === WindowBreakpoints.Desktop) {
        this.scrollEvent = throttle(150, () => this.changeColor())
        window.addEventListener(WindowEvents.Scroll, this.scrollEvent, false)
        this.changeColor()
      } else {
        this.scrollEvent = throttle(150, () => this.changeHeader())
        window.addEventListener(WindowEvents.Scroll, this.scrollEvent, false)
      }
    },
    removeEvents () {
      if (this.scrollEvent) { window.removeEventListener(WindowEvents.Scroll, this.scrollEvent, false) }
      if (this.resizeEvent) { window.removeEventListener(WindowEvents.Resize, this.resizeEvent, false) }
    },
    setViewBoxHeight () {
      try {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      } catch (e) {
        console.error(e)
      }
    },
    changeHeader () {
      console.warn(window.scrollTop)
      this.isStickyHeader = window.pageYOffset > 15
    },
    changeColor () {
      this.footerPosition = this.$refs?.footer?.getBoundingClientRect()?.top
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
$leftOffset: $PAGE_SIDE_OFFSET_DESKTOP;
$bottomOffset: 6rem;

$zIndexOverlay: $zLayerOverlay;
$zIndexHeader: $zLayerTop;
$zIndexContent: 1;

.page {
  &.is-menu-open {
    .page-overlay {
      pointer-events: auto;
    }
  }
  &.is-page-disable {
    .page-header {
      pointer-events: none !important;
      .header {
        &::v-deep {
          * {
            pointer-events: none !important;
          }
        }
      }
    }
    .page-overlay {
      pointer-events: auto;
    }
  }
}

.page-header {
  position: relative;
  z-index: $zIndexHeader;
}

.page-content {
  position: relative;
  z-index: $zIndexContent;
}

.page-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: $zIndexOverlay;
}

.page-fixed {
  display: none;
  position: fixed;
  left: $leftOffset;
  bottom: $bottomOffset;
  z-index: $zIndexContent;
}

@include desktop {
  .page-fixed {
    display: block;
  }
}
</style>
