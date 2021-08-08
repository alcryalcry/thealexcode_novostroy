<template>
  <Layout class="page-index">
    <ProjectsHeroCarousel class="js-dark-section" />
    <SectionAbout :data="about" />
    <SectionTeam :data="team" />
    <SectionPartners :data="partners" />
  </Layout>
</template>

<script>
import ProjectsHeroCarousel from '@/components/projects/ProjectsHeroCarousel'
import SectionAbout from '@/components/sections/SectionAbout'
import SectionTeam from '@/components/sections/SectionTeam'
import SectionPartners from '@/components/sections/SectionPartners'
import { fetchAbout, fetchPartners, fetchTeam } from '@/config/api'

export default {
  name: 'PageMain',
  components: {
    ProjectsHeroCarousel,
    SectionAbout,
    SectionTeam,
    SectionPartners
  },
  async asyncData () {
    const res = {
      about: {},
      team: {}
    }

    try {
      const [
        about,
        team,
        partners
      ] = await Promise.all([
        fetchAbout(),
        fetchTeam(),
        fetchPartners()
      ])

      res.about = about
      res.team = team
      res.partners = partners
    } catch (e) {
      console.error(e)
    }

    return res
  }
}
</script>

<style lang="scss" scoped>

</style>
