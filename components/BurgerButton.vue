<template>
  <button type="button" class="burger-button" :class="{ 'is-active': isActive }" @click="toggle">
    <span class="burger-button-lines" />
  </button>
</template>

<script>
export default {
  name: 'BurgerButton',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
$burgerSize: 32px;

.burger-button {
  &.is-active {
    .burger-button-lines {
      &::before {
        top: calc(50% - 1px);
        right: calc(50% - (#{$burgerSize / 2}));
        max-width: 100%;
        transform: rotate(45deg);
      }
      &::after {
        top: calc(50% - 1px);
        right: calc(50% - (#{$burgerSize / 2}));
        transform: rotate(-45deg);
      }
    }
  }
}

.burger-button {
  @include clear-btn();
  position: relative;
  right: -1rem;
  display: inline-flex;
  padding: 1rem;
  color: currentColor;
}

.burger-button-lines {
  position: relative;
  flex: 1;
  width: $burgerSize;
  height: $burgerSize;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 4px);
    right: 0;
    max-width: 50%;
    width: 100%;
    height: 2px;
    background: currentColor;
    transition: max-width .2s ease, top .2s ease, right .2s ease, transform .2s ease;
  }
  &::after {
    content: '';
    position: absolute;
    top: calc(50% + 4px);
    right: 0;
    width: 100%;
    max-width: 100%;
    height: 2px;
    background: currentColor;
    transition: top .2s ease, right .2s ease, transform .2s ease;
  }
}
</style>
