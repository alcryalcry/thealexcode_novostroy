<template>
  <Section class="section-team">
    <Container>
      <Team v-bind="currentData" />
    </Container>
  </Section>
</template>

<script>
import { AppModelTeam } from '@/models'
import Team from '@/components/Team.vue'

export default {
  name: 'SectionTeam',
  components: {
    Team
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
      return AppModelTeam.createFromRaw(this.data)
    }
  }
}
</script>
