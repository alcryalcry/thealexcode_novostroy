<template>
  <header
    v-on-clickaway="closeMenu"
    class="header"
    :class="{ 'is-menu-open': isMenuOpen, 'is-white': isWhite }"
  >
    <Section>
      <Container>
        <div class="header-row">
          <div class="header-row-info">
            <MainInfo />
          </div>
          <div class="header-row-burger">
            <BurgerButton :is-active="isMenuOpen" @toggle="toggleMenu" />
          </div>
        </div>
      </Container>
    </Section>

    <HeaderMenu v-bsl:reserveScrollBar="isMenuOpen" @click="closeMenu" />
  </header>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import BurgerButton from '@/components/BurgerButton'
import MainInfo from '@/components/MainInfo'
import HeaderMenu from '@/components/HeaderMenu'

export default {
  name: 'Header',
  components: {
    BurgerButton,
    MainInfo,
    HeaderMenu
  },
  mixins: [clickaway],
  props: {
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu () {
      this.isMenuOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
$colorBlack: var(--color-black);
$colorWhite: var(--color-white);
$t: .3s ease;
$zIndex: $zLayerNav;
$zIndex2: $zLayerSubNav;
$zIndex3: $zLayerOverlay;

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: $zIndex;
  color: $colorBlack;
  transition: color $t, background-color $t;

  &.is-white {
    color: $colorWhite;
  }

  &.is-menu-open {
    color: $colorWhite;
    .header-menu {
      pointer-events: auto;
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  z-index: $zIndex2;
  transition: $t;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-row-burger {
  position: relative;
  overflow: hidden;
  z-index: $zIndex3;
}

@include mobile {
  .header-menu {
    position: fixed;
    bottom: 0;
  }
  .header {
    &::v-deep {
      >.section {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    }
  }
}

@include tablet {
  .header-menu {
    position: fixed;
    bottom: 0;
  }

  .header {
    &::v-deep {
      >.section {
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
    }
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
