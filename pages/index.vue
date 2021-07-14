<template>
  <!-- <Layout class="page-index" is-white-header> -->
  <Layout class="page-index">
    <SectionAbout :data="about" />
    <SectionTeam :data="team" />
  </Layout>
</template>

<script>
import SectionAbout from '@/components/sections/SectionAbout'
import SectionTeam from '@/components/sections/SectionTeam'
import { fetchAbout, fetchTeam } from '@/config/api'

export default {
  components: {
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
