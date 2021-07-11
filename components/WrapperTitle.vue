<template>
  <div class="wrapper-title">
    <div class="wrapper-title-text">
      <div v-if="title" class="title--h1">
        {{ title }}
      </div>
    </div>
    <div class="wrapper-title-body">
      <div v-if="body" class="text--t3">
        {{ body }}
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
    },
    body: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-title {
  display: grid;
  grid-row-gap: 2rem;
}

@include desktop {
  .wrapper-title {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3.5rem;
  }
}
</style>
