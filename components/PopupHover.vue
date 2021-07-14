<template>
  <div class="popup-hover" :class="{ 'is-open': isOpen }">
    <div v-bsl:reserveScrollBarGap="isOpen" class="popup-hover-wrapper">
      <div class="popup-hover-background">
        <img v-if="img.url" :src="img.url" :alt="img.alternativeText">
      </div>
      <Section class="popup-hover-content">
        <Container v-if="body">
          <div class="popup-hover-content-body">
            <vue-markdown v-if="body" :source="body" class="text--t1" />
          </div>
        </Container>
      </Section>
      <BurgerButton class="popup-hover-close" :is-active="true" @click.stop="closeModal" />
    </div>
    <button ref="button" class="popup-hover-button" @mouseover="openModal" @mouseleave="closeModal">
      <i class="animate" :class="type">
        <IconAbout v-if="type === types.about" />
        <IconTeam v-if="type === types.team" />
      </i>
    </button>
  </div>
</template>

<script>
import BurgerButton from '@/components/BurgerButton'

import { AppModelPopupHover } from '@/models'
import IconAbout from '@/assets/svg/about.svg'
import IconTeam from '@/assets/svg/team.svg'

export default {
  name: 'PopupHover',
  components: {
    BurgerButton,
    IconAbout,
    IconTeam
  },
  props: {
    type: {
      type: String,
      default: AppModelPopupHover.types.about
    },
    img: {
      type: Object,
      default () {
        return {}
      }
    },
    body: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    types () {
      return AppModelPopupHover.types
    }
  },
  methods: {
    openModal () {
      this.isOpen = true
    },
    closeModal () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
$colorDefaultButton: var(--color-black);
$colorActiveButton: var(--color-white);
$colorCloseButton: var(--color-dark-gray);
$colorContent: var(--color-white);
$wrapperBg: var(--color-black);
$easeAnimation: $EASE_IN_OUT_SINE;

$zIndexOpened: $zLayerPopups;
$zIndexButtonOpened: $zLayerTop;
$zIndexContent: 2;
$zIndexWrapper: 3;
$zIndexClose: 4;

.popup-hover {
  display: flex;

  &.is-open {
    z-index: $zIndexOpened;
    .animate {
      animation-play-state: paused;
    }
    .popup-hover-wrapper {
      opacity: 1;
      transition-delay: 0.25s;
    }
    .popup-hover-button {
      color: $colorActiveButton;
      z-index: $zIndexButtonOpened;
      transition-delay: 0.25s;
    }
  }
}

.popup-hover-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  background: $wrapperBg;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
  z-index: $zIndexWrapper;
  transition: opacity 0.35s ease;
}

.popup-hover-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 59.86%);
  }
}

.popup-hover-content {
  position: relative;
  margin: auto 0;
  color: $colorContent;
  z-index: $zIndexContent;
}

.popup-hover-content-body {
  max-width: 62rem;
  padding: 2rem 2rem 2rem 0;
}

.popup-hover-close {
  @include clear-btn();

  position: absolute;
  top: 3rem;
  right: 4rem;
  color: $colorCloseButton;
  z-index: $zIndexClose;
}

.popup-hover-button {
  @include clear-btn();

  position: relative;
  width: 10.6rem;
  height: 10.6rem;
  padding: 1rem;
  color: $colorDefaultButton;
  transition: color .2s ease;
  * {
    pointer-events: none;
  }
}

.animate {
  display: inline-flex;
  &.about {
    transform-origin: center;
    animation: $easeAnimation iconMove 3s infinite;
  }
  &.team {
    transform-origin: left;
    animation: $easeAnimation iconRotate 2s infinite;
  }
}

@include mobile {
  .popup-hover-close {
    top: 2rem;
    right: 2rem;
  }
}

@include desktop {
  .popup-hover-close {
    display: none;
  }
}

@keyframes iconMove {
  0% {
    transform: translateX(-1rem);
  }
  50% {
    transform: translateX(1rem);
  }
  100% {
    transform: translateX(-1rem);
  }
}

@keyframes iconRotate {
  0% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-5deg);
  }
}
</style>
