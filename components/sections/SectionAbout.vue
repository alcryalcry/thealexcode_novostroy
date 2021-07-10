<template>
  <Section class="section-about">
    <Container>
      <div class="row">
        <div class="col col-4 col-md-8 col-sm-4">
          <WrapperTitle :title="currentData.title" />
        </div>
        <div class="col col-8 col-md-8 col-sm-4">
          <About :alter-image="currentData.alterImg" :body="currentData.body" :alter-body="currentData.alterBody" />
        </div>
      </div>
    </Container>
  </Section>
</template>

<script>
import { AppModelAbout } from '@/models'
import About from '@/components/About.vue'

export default {
  name: 'SectionAbout',
  components: {
    About
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    currentData () {
      return AppModelAbout.createFromRaw(this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-about {
}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
