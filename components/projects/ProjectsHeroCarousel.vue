<template>
  <Section class="projects-hero-carousel">
    <Container>
      <div v-if="slidesLength" class="grid">
        <transition name="list-fade" mode="out-in">
          <div :key="currentProject.id" class="grid-col-title">
            <h3 class="title--h1">
              {{ currentProject.title }}
            </h3>
            <div class="project-item-tags text--t3">
              <span :class="{ 'has-next': !!currentProject.year }">{{ currentProject.location }}</span>
              <span>{{ currentProject.year }}</span>
            </div>
          </div>
        </transition>
        <div class="grid-col-body">
          <div class="carousel-wrapper">
            <client-only>
              <Swiper
                ref="mySwiper"
                :options="computedSettings"
                @slideChange="slideChange"
                @sliderMove="onSliderMove"
              >
                <SwiperSlide
                  v-for="slide in getProjects"
                  :key="slide.id"
                  class="slide"
                >
                  <div class="slide-wrapper">
                    <NuxtLink
                      class="slide-img-wrapper"
                      :to="slide.relativeUrl"
                    >
                      <img
                        v-if="slide.img.url"
                        class="slide-img"
                        :src="slide.img.absoluteUrl"
                        :alt="slide.img.alternativeText"
                      >
                    </NuxtLink>
                    <div class="slide-info">
                      <div class="slide-info-title text--t2">
                        {{ slide.subtitle }}
                      </div>
                      <div class="slide-info-link-wrapper">
                        <Link
                          class="slide-info-link"
                          is-white
                          :label="$locale.projects.detail"
                          :url="slide.relativeUrl"
                          @mouseover.native="onMouseOver"
                          @mouseleave.native="onMouseLeave"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </client-only>
          </div>
          <div class="carousel-bottom">
            <div class="carousel-bottom-index gray text--t2">
              <transition name="list-fade" mode="out-in">
                <span
                  :key="carouselBottomInfo.current"
                  class="current"
                >{{ carouselBottomInfo.current }}</span>
              </transition>
              <span class="length">{{ carouselBottomInfo.all }}</span>
            </div>
            <div class="circle-indicator" :class="{ 'is-animate': !!currentTimer, 'is-hide': isTimerDisable }">
              <i class="icon">
                <IconCircleIndicator />
              </i>
            </div>
          </div>
          <div v-if="slidesLength" class="carousel-navigation">
            <button class="carousel-navigation-button prev" type="button" @click.prevent="goToPrev(true)">
              <i class="icon">
                <IconArrowCarousel />
              </i>
            </button>
            <button class="carousel-navigation-button next" type="button" @click.prevent="goToNext(true)">
              <i class="icon">
                <IconArrowCarousel />
              </i>
            </button>
          </div>
        </div>
      </div>
    </Container>
  </Section>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppModelProject } from '@/models'
import { decimal, WindowBreakpoints } from '@/config/constants'
import IconArrowCarousel from '@/assets/svg/arrowCarousel.svg'
import IconCircleIndicator from '@/assets/svg/circleIndicator.svg'

export default {
  name: 'ProjectsHeroCarousel',
  components: {
    IconArrowCarousel,
    IconCircleIndicator
  },
  props: {
    autoplayDuration: {
      type: Number,
      default: 7000
    }
  },
  data () {
    return {
      currentTimer: null,
      isHovering: false,
      isTimerDisable: false,
      touchReleaseOnEdges: true,
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      getProjects: 'getProjects',
      getMediaSize: 'getMediaSize'
    }),
    computedSettings () {
      return {
        slidesPerView: 1,
        threshold: 10,
        pagination: false,
        navigation: false,
        spaceBetween: 20,
        effect: this.getMediaSize === WindowBreakpoints.Desktop ? 'fade' : 'slide',
        fadeEffect: {
          crossFade: true
        }
      }
    },
    currentProject () {
      return this.getProjects[this.currentIndex] || AppModelProject.createFromRaw()
    },
    slidesLength () {
      return this.getProjects.length || 0
    },
    carouselBottomInfo () {
      const res = {
        current: '',
        all: ''
      }
      if (this.getProjects.length) {
        res.current = decimal(this.currentIndex + 1)
        res.all = decimal(this.getProjects.length)
      }
      return res
    }
  },
  mounted () {
    if (process.browser) {
      this.startTimer()
    }
  },
  methods: {
    onSliderMove () {
      this.stopTimer(true)
    },
    slideChange () {
      this.currentIndex = this.getSwiper()?.realIndex || 0
      this.resetTimer()
    },
    getSwiper () {
      try {
        return this.$refs.mySwiper.$swiper
      } catch (e) {
      }
    },
    startTimer () {
      if (this.isTimerDisable) {
        return
      }
      this.currentTimer = setInterval(() => {
        this.goToNext()
      }, this.autoplayDuration)
    },
    stopTimer (needDisable = false) {
      if (needDisable) {
        this.isTimerDisable = true
      }
      clearInterval(this.currentTimer)
      this.currentTimer = null
    },
    async resetTimer () {
      this.stopTimer()
      await this.$nextTick()
      this.startTimer()
    },
    onMouseOver () {
      this.isHovering = true
      this.stopTimer()
    },
    onMouseLeave () {
      this.isHovering = false
      this.startTimer()
    },
    goToPrev (needDisable) {
      if (needDisable) {
        this.isTimerDisable = true
      }

      const swiper = this.getSwiper()

      if (!swiper) {
        return
      }
      if (this.currentIndex === 0) {
        swiper.slideTo(this.slidesLength - 1)
      } else {
        swiper.slidePrev()
      }
    },
    goToNext (needDisable) {
      if (needDisable) {
        this.isTimerDisable = true
      }

      const swiper = this.getSwiper()

      if (!swiper) {
        return
      }
      if (this.currentIndex === this.slidesLength - 1) {
        swiper.slideTo(0)
      } else {
        swiper.slideNext()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$offsetTablet: $CONTAINER_SIDE_OFFSET_TABLET;
$offsetMobile: $CONTAINER_SIDE_OFFSET_MOBILE;
$colGapDesktop: $COL_GAP_DESKTOP;
$sectionOffsetDesktop: 4rem;
$colorWhite: var(--color-white);
$zIndex1: 1;
$zIndex2: 2;
$zIndex3: 3;

.circle-indicator {
  position: relative;
  display: flex;
  width: 1.8rem;
  height: 1.8rem;
  transition: opacity .2s ease;
  &.is-animate {
    svg {
      animation: offsettozero 7s linear infinite;
    }
  }
  &.is-hide {
    opacity: 0;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 3px solid rgba(#fff, .4);
    border-radius: 50%;
  }
  .icon {
    position: relative;
    z-index: 1;
    transform: rotate(-90deg);
  }
  svg {
    stroke-dasharray: 251; /* (2PI * 40px) */
    stroke-dashoffset: 251;
  }
}

.projects-hero-carousel {
  padding-top: 0;
}
.grid-col-body {
  position: relative;
}
.grid-col-title {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: $colGapDesktop;
}
.project-item-tags {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: .4rem;
    left: -2rem;
    pointer-events: none;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    overflow: hidden;
    background: currentColor;
  }
  > * {
    &.has-next {
      &::after {
        content: ', ';
      }
    }
  }
}

.carousel-bottom-index {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  & + .circle-indicator {
    margin-left: 1rem;
  }

  .length {
    &::before {
      content: '/';
    }
  }
}

.slide-wrapper {
  position: relative;
}

.slide-info {
  position: absolute;
  top: $sectionOffsetDesktop;
  left: 4rem;
  color: $colorWhite;
  max-width: 40rem;
  z-index: $zIndex2;
}

.slide-info-title {
  margin-bottom: 2rem;
}

.slide-img-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%);
    z-index: $zIndex1;
  }
}

.carousel-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
.swiper-container {
  width: 100%;
}

.slide-wrapper {
  height: 100%;
}

.carousel-bottom {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 1;
  color: $colorWhite;
}

.carousel-navigation {
  display: none;
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  right: -10rem;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-navigation-button {
  @include clear-btn();
  position: relative;
  width: 12rem;
  display: flex;
  align-items: center;
  color: $colorWhite;
  z-index: $zIndex3;
  opacity: 0;
  transition: opacity .2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 50vh;
    width: 20vw;
    transform: translateY(-50%);
  }

  .icon {
    width: 3.2rem;
    height: 3.2rem;
    transition: transform .2s ease;
  }

  &.prev {
    left: 0;
    justify-content: flex-start;
    .icon {
      margin-left: 4rem;
      transform: rotate(180deg);
    }
  }

  &.next {
    justify-content: flex-end;
    &::before {
      left: auto;
      right: 0;
    }
    .icon {
      margin-right: 4rem;
    }
  }
}

@include mobile {
  .slide-info {
    top: 9rem;
    left: $offsetMobile;
  }
  .carousel-bottom {
    right: $offsetMobile;
    bottom: 1.5rem;
  }
  .grid {
    grid-row-gap: 0;
  }
  .grid-col-title {
    display: none;
  }
  .projects-hero-carousel {
    padding: 0;
  }
  .slide-img-wrapper {
    &::before {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%);
    }
  }
}
@include mobile_tablet {
  .grid {
    display: flex;
    width: 100%;
  }
  .grid-col-body {
    display: flex;
    width: 100%;
  }
}
@include tablet {
  .slide-img-wrapper {
    &::before {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%);
    }
  }
  .slide-info {
    top: 13rem;
  }
  .grid {
    grid-row-gap: 0;
  }
  .carousel-bottom {
    right: $offsetTablet;
    bottom: 3.5rem;
  }
  .grid-col-title {
    display: none;
  }
  .projects-hero-carousel {
    padding: 0;
  }
}

@include desktop {
  .carousel-navigation {
    display: flex;
  }
  .carousel-wrapper {
    width: calc(100% + 10rem);
    max-width: none;
  }

  .grid-col-title {
    padding-top: 4.5rem;
  }
  .carousel-bottom {
    bottom: 4.5rem;
  }

  .slide-img-wrapper {
    pointer-events: none;
    &::before {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%);
    }
  }

  .carousel-navigation-button {
    &:hover {
      opacity: 1;

      &:active {
        &.next .icon {
          transform: translateX(1rem);
        }
        &.prev .icon {
          transform: rotate(180deg) translateX(1rem);
        }
      }

      &.next .icon {
        transform: translateX(.5rem);
      }
      &.prev .icon {
        transform: rotate(180deg) translateX(.5rem);
      }
    }
  }
}

@keyframes offsettozero {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
