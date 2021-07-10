<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="scss" scoped>
$containerWidthDesktop: $CONTAINER_WIDTH_DESKTOP;
$containerWidthTablet: $CONTAINER_WIDTH_TABLET;
$containerWidthMobile: $CONTAINER_WIDTH_MOBILE;

.container {
  margin-right: auto;
  margin-left: auto;
  min-height: 100%;
  height: inherit;

  & + .container {
    margin-top: 1rem;
  }
}

@include mobile {
  .container {
    width: $containerWidthMobile;
  }
}

@include tablet {
  .container {
    width: $containerWidthTablet;
  }
}

@include desktop {
  .container {
    width: $containerWidthDesktop;
  }
}
</style>
