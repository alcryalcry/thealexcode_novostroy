<template>
  <div class="wrapper-title">
    <div class="row">
      <div class="col col-4 col-md-8 col-sm-4">
        <div class="title--h1">
          {{ title }}
        </div>
      </div>
      <div class="col col-8 col-md-8 col-sm-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WrapperTItle',
  props: {
    title: {
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

.wrapper-title {

}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
