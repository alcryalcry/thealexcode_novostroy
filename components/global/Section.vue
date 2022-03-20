<template>
  <section class="section" :class="{ 'section--black': isBlack }">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'Section',
  props: {
    isBlack: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$colorBlack: var(--color-black);
$colorWhite: var(--color-white);
$containerSideOffsetTablet: $CONTAINER_SIDE_OFFSET_TABLET;
$containerSideOffsetMobile: $CONTAINER_SIDE_OFFSET_MOBILE;

.is-debug .section {
  box-shadow: inset 0 0 0 1px rgba(0, 255, 255, 0.5);
}

.section {
  &.section--black {
    background: $colorBlack;
    color: $colorWhite;
  }
}

@include mobile {
  .section {
    padding: 4rem $containerSideOffsetMobile
  }
}

@include tablet {
  .section {
    padding: 4.5rem $containerSideOffsetTablet
  }
}

@include desktop {
  .section {
    padding: 7rem 0;
  }
}
</style>
