<template>
  <n-link :to="url" class="link">
    <span class="link-label">
      {{ label }}
    </span>
    <slot />
  </n-link>
</template>

<script>
export default {
  name: 'Link',
  props: {
    label: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$mobile: $MOBILE;
$tablet: $TABLET;
$desktop: $DESKTOP;

.link {

}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
