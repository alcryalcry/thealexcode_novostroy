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
import ProjectsPageCarousel from '@/components/projects/ProjectsPageCarousel'

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
  computed: {
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
