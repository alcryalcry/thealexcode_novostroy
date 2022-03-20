<template>
  <Layout class="page-projects">
    <Projects />
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Projects from '@/components/projects/Projects.vue'
import { pageHead } from '@/config/constants'

export default {
  name: 'PageProjects',
  components: {
    Projects
  },
  head () {
    const title = this.getSettings.seoProjectsTitle
    const description = this.getSettings.seoProjectsDescription
    const image = this.getSettings.seoImage

    return {
      ...pageHead(title, description, image)
    }
  },
  computed: {
    ...mapGetters({
      getSettings: 'getSettings'
    })
  }
}
</script>

<style lang="scss" scoped>
@include mobile {
  .page-projects {
    padding-top: 5rem;
  }
}
@include tablet {
  .page-projects {
    padding-top: 9rem;
  }
}
</style>
