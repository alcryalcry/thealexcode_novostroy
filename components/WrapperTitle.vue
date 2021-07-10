<template>
  <div class="wrapper-title">
    <div class="row no-gap ai-sb">
      <div class="col col-6 col-md-8 col-sm-4">
        <div v-if="title" class="title--h1">
          {{ title }}
        </div>
      </div>
      <div v-if="body" class="col col-6 col-md-8 col-sm-4">
        <div class="text--t3">
          {{ body }}
        </div>
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

}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
