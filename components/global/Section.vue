<template>
  <section class="section">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'Section'
}
</script>

<style lang="scss" scoped>
$containerSideOffsetTablet: $CONTAINER_SIDE_OFFSET_TABLET;
$containerSideOffsetMobile: $CONTAINER_SIDE_OFFSET_MOBILE;

.is-debug .section {
  box-shadow: inset 0 0 0 1px rgba(0, 255, 255, 0.5);
}

@include mobile {
  .section {
    padding: 2rem $containerSideOffsetMobile
  }
}

@include tablet {
  .section {
    padding: 4.5rem $containerSideOffsetTablet
  }
}

@include desktop {
  .section {
    padding: 6rem 0;
  }
}
</style>
