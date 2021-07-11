<template>
  <div class="wrapper-title">
    <div class="wrapper-title-text">
      <h3 v-if="title" class="title--h1">
        {{ title }}
      </h3>
    </div>
    <div class="wrapper-title-body">
      <vue-markdown v-if="body" :source="body" class="text--t3" />
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
    },
    body: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$colGapDesktop: $COL_GAP_DESKTOP;

.wrapper-title {
  display: grid;
  grid-row-gap: 2rem;
}

@include desktop {
  .wrapper-title {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: $colGapDesktop;
  }
}
</style>
