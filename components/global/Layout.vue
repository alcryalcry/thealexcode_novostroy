<template>
  <div class="page" :class="{ 'is-menu-open': getHeaderStatus, 'is-page-disable': isPageDisable }">
    <div class="page-header">
      <Header :current-color="currentColors.header" :is-white="isWhiteHeader" :is-sticky="isStickyHeader" />
    </div>

    <main class="page-content">
      <slot />
      <div ref="fixedEl" class="page-fixed" :style="{ color: currentColors.mainInfo }">
        <MainInfo />
      </div>
    </main>

    <div ref="footer" class="page-footer js-dark-section">
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
      windowWidthOld: 0,
      headerPosTop: 0,
      headerPosBottom: 0,
      sectionsPosition: [],
      isPageDisable: false,
      isStickyHeader: false,
      footerPosition: null,
      fixedElPosition: null,
      currentColors: {
        mainInfo: Colors.Black,
        header: Colors.Black
      }
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
      immediate: true,
      handler () {
        this.setPopupHoverStatus(false)
        this.setHeaderStatus(false)
        if (process.browser) {
          this.removeEvents()
          setTimeout(() => {
            this.initEvents()
          }, 100)
        }
      }
    },
    getPopupHoverStatus (val) {
      if (this.getMediaSize === WindowBreakpoints.Desktop) {
        this.isPageDisable = false
        return
      }

      setTimeout(() => {
        this.isPageDisable = val
      }, 500)
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
      this.windowWidthOld = window.innerWidth

      this.resizeEvent = throttle(150, () => {
        if (this.windowWidthOld !== window.innerWidth) {
          this.setViewBoxHeight()
          this.windowWidthOld = window.innerWidth
        }
      })
      window.addEventListener(WindowEvents.Resize, this.resizeEvent, false)

      this.setViewBoxHeight()

      if (this.getMediaSize === WindowBreakpoints.Desktop) {
        this.scrollEvent = throttle(250, () => this.changeColor())
        window.addEventListener(WindowEvents.Scroll, this.scrollEvent, false)
        this.changeColor()
      } else {
        this.scrollEvent = throttle(150, () => this.changeHeader())
        window.addEventListener(WindowEvents.Scroll, this.scrollEvent, false)
      }
    },
    removeEvents () {
      this.currentColors.mainInfo = Colors.Black
      this.currentColors.header = Colors.Black
      this.headerPosTop = 0
      this.headerPosBottom = 0
      this.sectionsPosition = []
      this.footerPosition = null
      this.fixedElPosition = null

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
      this.isStickyHeader = window.pageYOffset > 15
    },
    changeColor () {
      this.getDarkSectionsPosition(true)

      this.footerPosition = this.$refs?.footer?.getBoundingClientRect()?.top
      this.fixedElPosition = this.$refs?.fixedEl?.getBoundingClientRect()?.top

      const condition = this.sectionsPosition.some((section) => {
        return ((window.scrollY - this.headerPosTop) > section.y1 && (window.scrollY - this.headerPosBottom) < section.y2)
      })
      this.currentColors.header = condition ? Colors.White : Colors.Black

      if (this.fixedElPosition > this.footerPosition) {
        this.currentColors.mainInfo = Colors.White
      } else {
        this.currentColors.mainInfo = Colors.Black
      }
    },
    getDarkSectionsPosition (needClear) {
      const burger = document.querySelector('.js-burger')

      if (this.getMediaSize === WindowBreakpoints.Desktop) {
        if (needClear) {
          this.sectionsPosition = []
        }
        if (!burger) {
          return
        }

        this.headerPosTop = burger.offsetTop - 10
        this.headerPosBottom = burger.offsetTop - burger.offsetHeight / 2
        document.querySelectorAll('.js-dark-section').forEach((section) => {
          this.sectionsPosition.push({
            y1: section.offsetTop,
            y2: section.offsetTop + section.offsetHeight
          })
        })
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
  z-index: 3;
}

.page-overlay {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;
}

.page-fixed {
  display: none;
  position: fixed;
  left: $leftOffset;
  bottom: $bottomOffset;
  z-index: $zIndexContent;
}

@include desktop {
  .page-overlay {
    display: block;
  }
  .page-fixed {
    display: block;
  }
}
</style>
