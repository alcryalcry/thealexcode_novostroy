<template>
  <Section class="section-about">
    <Container>
      <div class="grid">
        <div class="grid-col-title">
          <WrapperTitle :title="currentData.title" />
        </div>
        <div class="grid-col-body">
          <About :alter-img="currentData.alterImg" :body="currentData.body" :alter-body="currentData.alterBody" />
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
$borderColor: var(--color-gray);

.section-about {
  border-bottom: 1px solid $borderColor;
}

@include desktop {
  .section-about {
    border: none;
  }
}
</style>
