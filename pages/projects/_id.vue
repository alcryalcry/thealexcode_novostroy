<template>
  <main>
    <div class="page">
      <div class="page-projects-one">
        <ProjectsPageCarousel :id="projectId" :prev-route="prevRoute" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectsPageCarousel from '@/components/projects/ProjectsPageCarousel'
import { pageHead } from '@/config/constants'

export default {
  name: 'PageProjectsOne',
  components: {
    ProjectsPageCarousel
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.prevRoute = from
    })
  },
  data () {
    return {
      prevRoute: null
    }
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
    }),
    projectId () {
      return Number(this.$route?.params?.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-projects-one {
  margin: auto 0;
}
</style>
