<template>
  <Section class="section-team">
    <Container>
      <Partners v-bind="currentData" />
    </Container>
  </Section>
</template>

<script>
import { AppModelPartners } from '@/models'
import Partners from '@/components/Partners.vue'

export default {
  name: 'SectionPartners',
  components: {
    Partners
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
      return AppModelPartners.createFromRaw(this.data)
    }
  }
}
</script>
