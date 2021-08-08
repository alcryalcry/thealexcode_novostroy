<template>
  <Section class="projects-page-carousel">
    <Container>
      <div v-if="slidesLength" class="carousel-wrapper">
        <client-only>
          <Swiper
            ref="mySwiper"
            :options="computedSettings"
            @slideChange="slideChange"
          >
            <SwiperSlide
              v-for="slide in currentProject.slides"
              :key="slide.id"
              class="slide"
            >
              <div class="slide-wrapper">
                <picture class="slide-image">
                  <img
                    v-if="slide.img.url"
                    :src="slide.img.absoluteUrl"
                    :alt="slide.img.alternativeText"
                  >
                </picture>
                <div class="carousel-bottom">
                  <div class="carousel-bottom-info">
                    <div class="title title--h1">
                      {{ currentProject.title }}
                    </div>
                    <div class="caption gray text--t3">
                      {{ slide.caption }}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
        <div class="carousel-bottom">
          <div class="carousel-bottom-info">
            <div class="title title--h1">
              {{ currentProject.title }}
            </div>
            <transition name="list-fade" mode="out-in">
              <div :key="currentIndex" class="caption gray text--t3">
                {{ currentSlide.caption }}
              </div>
            </transition>
          </div>
          <div class="carousel-bottom-index gray text--t3">
            <transition name="list-fade" mode="out-in">
              <span
                :key="currentIndex"
                class="current"
              >{{ currentIndex + 1 }}</span>
            </transition>
            <span class="length">{{ slidesLength }}</span>
          </div>
        </div>
      </div>
      <BurgerButton class="popup-hover-close" :is-active="true" @toggle="closeModal" />
    </Container>
    <div v-if="slidesLength" class="carousel-navigation">
      <button class="carousel-navigation-button prev" type="button" @click.prevent="goToPrev">
        <i class="icon">
          <IconArrowCarousel />
        </i>
      </button>
      <button class="carousel-navigation-button next" type="button" @click.prevent="goToNext">
        <i class="icon">
          <IconArrowCarousel />
        </i>
      </button>
    </div>
  </Section>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppModelProject } from '@/models'
import IconArrowCarousel from '@/assets/svg/arrowCarousel.svg'
import BurgerButton from '@/components/BurgerButton'
import { RouteNames, WindowBreakpoints } from '@/config/constants'

export default {
  name: 'ProjectsPageCarousel',
  components: {
    BurgerButton,
    IconArrowCarousel
  },
  props: {
    id: {
      type: [Number, null],
      default: null
    }
  },
  data () {
    return {
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
        slidesPerView: this.getMediaSize === WindowBreakpoints.Desktop ? 1 : 1.2,
        pagination: false,
        navigation: false,
        slidesOffsetBefore: this.getMediaSize === WindowBreakpoints.Tablet ? 40 : 20,
        slidesOffsetAfter: this.getMediaSize === WindowBreakpoints.Tablet ? 40 : 20,
        spaceBetween: 20,
        effect: this.getMediaSize === WindowBreakpoints.Desktop ? 'fade' : 'slide',
        fadeEffect: {
          crossFade: true
        }
      }
    },
    currentProject () {
      return this.getProjects.find(item => item.id === this.id) || AppModelProject.createFromRaw()
    },
    currentSlide () {
      return this.currentProject?.slides[this.currentIndex] || {}
    },
    slidesLength () {
      return this.currentProject.slides.length
    }
  },
  methods: {
    slideChange () {
      this.currentIndex = this.getSwiper()?.realIndex || 0
    },
    getSwiper () {
      try {
        return this.$refs.mySwiper.$swiper
      } catch (e) {
        console.warn('swiper doesnt init')
      }
    },
    closeModal () {
      this.$router.push({ name: RouteNames.Projects })
    },
    goToPrev () {
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
    goToNext () {
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
$colorWhite: var(--color-white);
$colorDarkGray: var(--color-dark-gray);
$zIndexNavigation: 1;
$zIndexClose: 2;
$zIndex3: 3;

.swiper-container {
  width: 100%;
}

.projects-page-carousel {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
}

.burger-button {
  position: fixed;
  color: $colorDarkGray;
  z-index: $zIndexClose;
}

.gray {
  color: $colorDarkGray;
}

.container {
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

.carousel-wrapper {
  margin: auto 0;
}

.carousel-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
}

.carousel-bottom-info {
  display: flex;
  align-items: flex-start;

  >.title {
    flex-shrink: 0;
  }
}

.carousel-bottom-index {
  display: none;
  align-items: center;
  flex-shrink: 0;

  .length {
    &::before {
      content: '/';
      padding: 0 .5rem;
    }
  }
}

.carousel-navigation {
  display: none;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-navigation-button {
  @include clear-btn();
  position: relative;
  width: 12rem;
  display: flex;
  align-items: center;
  color: $colorDarkGray;
  z-index: $zIndex3;
  opacity: 0;
  transition: opacity .2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 70vh;
    width: 30vw;
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

.slide {
  display: flex;
}

.slide-wrapper {
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}

.slide-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@include mobile {
  .carousel-bottom-info {
    flex-flow: column nowrap;
    >.title {
      & + .caption {
        margin-top: 1rem;
      }
    }
  }
  .burger-button {
    top: 2rem;
    right: 2rem;
  }
  .carousel-bottom {
    padding: 0 2rem;
  }
  .slide-image {
    height: 27vh;
    height: calc(var(--vh, 1vh) * 27);
  }
}

@include tablet {
  .slide-image {
    height: 40vh;
    height: calc(var(--vh, 1vh) * 40);
  }
  .burger-button {
    top: 4rem;
    right: 4rem;
  }
  .carousel-bottom {
    padding: 0 2rem;
  }
  .carousel-bottom-info {
    >.title {
      & + .caption {
        margin-left: 2rem;
      }
    }
  }
}

@include mobile_tablet {
  .slide-wrapper {
    .carousel-bottom {
      display: flex;
      padding: 0;
    }
  }
  .carousel-bottom {
    display: none;
  }
}

@include desktop {
  .projects-page-carousel {
    padding: 12vh 0;
    padding: calc(var(--vh, 1vh) * 12) 0;
  }
  .slide-wrapper {
    .carousel-bottom {
      display: none;
    }
  }
  .carousel-bottom-info {
    >.title {
      & + .caption {
        margin-left: 2rem;
      }
    }
  }
  .carousel-bottom-index {
    display: flex;
  }
  .burger-button {
    top: 4vh;
    top: calc(var(--vh, 1vh) * 4);
    right: 10rem;
  }
  .carousel-navigation {
    display: flex;
    z-index: 1;
  }

  .swiper-container {
    height: 67vh;
    height: calc(var(--vh, 1vh) * 67);
  }

  .carousel-wrapper {
    padding: 0 12rem;
  }

  .slide-image {
    width: 100%;
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
</style>
