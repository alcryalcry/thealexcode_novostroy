<template>
  <Section class="section-team">
    <Container>
      <Team
        :title="currentData.title"
        :subtitle="currentData.subtitle"
        :img="currentData.img"
        :alter-img="currentData.alterImg"
        :body="currentData.body"
        :alter-body="currentData.alterBody"
      />
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

<style lang="scss" scoped>
@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
