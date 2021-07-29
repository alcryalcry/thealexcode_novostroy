<template>
  <Section class="projects-page-carousel">
    <Container>
      <div v-if="slidesLength" class="carousel-wrapper">
        <client-only>
          <carousel
            v-model="currentIndex"
            v-bind="computedSettings"
          >
            <slide
              v-for="slide, index in currentProject.slides"
              :key="slide.id"
              class="slide"
              :class="{ 'VueCarousel-slide-active': currentIndex === index }"
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
            </slide>
          </carousel>
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
        perPage: this.getMediaSize === WindowBreakpoints.Desktop ? 1 : 1.1,
        scrollPerPage: !!this.getMediaSize === WindowBreakpoints.Desktop,
        paginationEnabled: false,
        navigationEnabled: false
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
    closeModal () {
      this.$router.push({ name: RouteNames.Projects })
    },
    goToPrev () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.slidesLength - 1
      } else {
        this.currentIndex--
      }
    },
    goToNext () {
      if (this.currentIndex === this.slidesLength - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$colorDarkGray: var(--color-dark-gray);
$zIndexNavigation: 1;
$zIndexClose: 2;

.projects-page-carousel {
  padding: 4rem 0;
}

.burger-button {
  position: fixed;
  color: $colorDarkGray;
  z-index: $zIndexClose;
}

.gray {
  color: $colorDarkGray;
}

.carousel-wrapper {
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
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
}

.carousel-navigation-button {
  @include clear-btn();
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12rem;
  display: flex;
  align-items: center;
  color: $colorDarkGray;
  z-index: $zIndexNavigation;

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
    right: 0;
    justify-content: flex-end;
    .icon {
      margin-right: 4rem;
    }
  }
}

.slide-image {
  display: flex;
  justify-content: center;
  align-items: center;
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
  .VueCarousel {
    &::v-deep {
      .VueCarousel-slide {
        padding: 0 1rem;
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
}

@include tablet {
  .VueCarousel {
    &::v-deep {
      .VueCarousel-slide {
        padding: 0 1rem;
      }
    }
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
    padding: 12rem 0;
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
    top: 4rem;
    right: 10rem;
  }
  .carousel-navigation {
    display: block;
  }

  .carousel-wrapper {
    // width: 108rem;
    padding: 0 12rem;
  }

  .slide-image {
    width: 100%;
  }

  .carousel-navigation-button {
    &:hover {
      &.next .icon {
        transform: translateX(.5rem);
      }
      &.prev .icon {
        transform: rotate(180deg) translateX(.5rem);
      }
    }
  }

  .VueCarousel {
    &::v-deep {
      .VueCarousel-inner {
        transition: none !important;
      }

      .VueCarousel-slide {
        transition: opacity .75s ease !important;
        opacity: 0 !important;
      }

      .VueCarousel-slide-active {
        transition: opacity .75s ease !important;
        opacity: 1 !important;
      }
    }
  }
}
</style>
