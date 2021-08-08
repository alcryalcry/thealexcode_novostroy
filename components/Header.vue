<template>
  <header
    v-on-clickaway="closeMenu"
    class="header"
    :class="{ 'is-menu-open': isMenuOpen, 'is-sticky': isSticky }"
    :style="{ color: currentColor }"
  >
    <Section>
      <Container>
        <div class="header-row">
          <div class="header-row-info">
            <MainInfo />
          </div>
          <div class="header-row-burger">
            <BurgerButton class="js-burger" :is-active="isMenuOpen" @toggle="toggleMenu" />
          </div>
        </div>
      </Container>
    </Section>

    <HeaderMenu :is-open="isMenuOpen" @click="closeMenu" />
  </header>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapMutations } from 'vuex'
import BurgerButton from '@/components/BurgerButton'
import MainInfo from '@/components/MainInfo'
import HeaderMenu from '@/components/HeaderMenu'

const Colors = {
  White: 'var(--color-white)',
  Black: 'var(--color-black)'
}

export default {
  name: 'Header',
  components: {
    BurgerButton,
    MainInfo,
    HeaderMenu
  },
  mixins: [clickaway],
  props: {
    currentColor: {
      type: String,
      default: Colors.Black
    },
    isSticky: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  watch: {
    isMenuOpen (val) {
      this.setHeaderStatus(val)
    }
  },
  methods: {
    ...mapMutations({
      setHeaderStatus: 'setHeaderStatus'
    }),
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
      this.setHeaderStatus(this.isMenuOpen)
    },
    closeMenu () {
      this.isMenuOpen = false
      this.setHeaderStatus(false)
    }
  }
}
</script>

<style lang="scss" scoped>
$colorBlackScss: $COLOR_BLACK;
$colorBlack: var(--color-black);
$colorWhite: var(--color-white);
$t: .3s ease;
$zIndex: $zLayerNav;
$zIndex2: $zLayerSubNav;
$zIndex3: $zLayerOverlay;
$zIndex4: $zLayerSubInfo;
$zIndex5: $zLayerPopups;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $zIndex;
  color: $colorBlack;
  transition: color $t, background-color $t;
  pointer-events: none;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba($colorBlackScss, .6);
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s ease;
    z-index: $zIndex4;
  }

  &.is-menu-open {
    pointer-events: auto;
    color: $colorWhite;
    .burger-button {
      color: $colorWhite;
    }
    &::before {
      opacity: 1;
    }
    .header-menu {
      pointer-events: auto;
      opacity: 1;
      transform: translateY(0);
      transition: transform .6s cubic-bezier(0.535, 0, 0, 1), opacity .2s ease;
    }
  }
}

.header-row-info {
  pointer-events: auto;
}

.header-menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
  display: flex;
  flex-flow: column nowrap;
  min-height: 41rem;
  z-index: $zIndex3;
  transition: transform .6s cubic-bezier(0.535, 0, 0, 1), opacity .2s ease .6s
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-row-burger {
  position: relative;
  overflow: hidden;
  z-index: $zIndex5;
  pointer-events: auto;
}

@include mobile {
  .header {
    &::v-deep {
      >.section {
        padding-top: 1rem;
        padding-bottom: 1rem;
        transition: background-color .2s ease, color .2s ease;
      }
    }
    &.is-sticky {
      &::v-deep {
        >.section {
          background-color: rgba(#fff, .8);
          color: $colorBlack;
        }
      }
    }
  }
  .header-menu {
    position: fixed;
    bottom: 0;
  }
}

@include tablet {
  .header {
    &::v-deep {
      >.section {
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
      &.is-sticky {
        &::v-deep {
          >.section {
            background-color: rgba(#fff, .8);
            color: $colorBlack;
          }
        }
      }
    }
  }

  .header-menu {
    position: fixed;
    bottom: 0;
  }
}

@include desktop {
  .header {
    &::v-deep {
      >.section {
        padding-top: 3.5rem;
        padding-bottom: 3.5rem;
      }
    }
    .main-info {
      display: none;
    }
  }
}
</style>
