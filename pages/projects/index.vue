<template>
  <Layout class="page-projects">
    <Projects />
  </Layout>
</template>

<script>
import Projects from '@/components/projects/Projects.vue'

export default {
  name: 'PageProjects',
  components: {
    Projects
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
