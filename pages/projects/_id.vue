<template>
  <main>
    <div class="page">
      <div class="page-projects-one">
        <ProjectsPageCarousel :id="projectId" />
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
