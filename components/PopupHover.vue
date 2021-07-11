<template>
  <div class="popup-hover" :class="{ 'is-open': isOpen }">
    <div v-bsl:reserveScrollBarGap="isOpen" class="popup-hover-wrapper">
      <div class="popup-hover-background">
        <img v-if="img.url" :src="img.url" :alt="img.alternativeText">
      </div>
      <Section class="popup-hover-content">
        <Container v-if="body">
          <div class="popup-hover-content-body">
            <div class="text--t1">
              {{ body }}
            </div>
          </div>
        </Container>
      </Section>
      <button type="button" class="popup-hover-close" @click.stop="closeModal">
        <IconClose />
      </button>
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
import { AppModelPopupHover } from '@/models'
import IconClose from '@/assets/svg/close.svg'
import IconAbout from '@/assets/svg/about.svg'
import IconTeam from '@/assets/svg/team.svg'

export default {
  name: 'PopupHover',
  components: {
    IconClose,
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
$colorContent: var(--color-white);
$wrapperBg: var(--color-black);
$easeAnimation: $EASE_IN_OUT_SINE;

$zIndexButton: 10;
$zIndexContent: 2;
$zIndexMenuOpened: 3;
$zIndexBurger: 4;

.popup-hover {
  display: flex;

  &.is-open {
    .animate {
      animation-play-state: paused;
    }
    .popup-hover-wrapper {
      opacity: 1;
      transition-delay: 0.25s;
    }
    .popup-hover-button {
      color: $colorActiveButton;
      z-index: $zIndexButton;
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
  z-index: $zIndexMenuOpened;
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
  top: 1.6rem;
  right: 1.6rem;
  width: 3.2rem;
  height: 3.2rem;
  padding: .4rem;
  color: $colorActiveButton;
  transition: color 0.2s ease;
  z-index: $zIndexBurger;
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
