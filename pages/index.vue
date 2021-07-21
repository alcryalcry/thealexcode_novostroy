<template>
  <Layout class="page-index" is-white-header>
    <ProjectsHeroCarousel />
    <SectionAbout :data="about" />
    <SectionTeam :data="team" />
  </Layout>
</template>

<script>
import ProjectsHeroCarousel from '@/components/projects/ProjectsHeroCarousel'
import SectionAbout from '@/components/sections/SectionAbout'
import SectionTeam from '@/components/sections/SectionTeam'
import { fetchAbout, fetchTeam } from '@/config/api'

export default {
  name: 'PageMain',
  components: {
    ProjectsHeroCarousel,
    SectionAbout,
    SectionTeam
  },
  async asyncData () {
    const res = {
      about: {},
      team: {}
    }

    try {
      const [
        about,
        team
      ] = await Promise.all([
        fetchAbout(),
        fetchTeam()
      ])

      res.about = about
      res.team = team
    } catch (e) {
      console.error(e)
    }

    return res
  }
}
</script>

<style lang="scss" scoped>

</style>
