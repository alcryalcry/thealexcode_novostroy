<template>
  <div class="page-index">
    <SectionAbout :data="about" />
    <SectionTeam :data="team" />
  </div>
</template>

<script>
import SectionAbout from '@/components/sections/SectionAbout'
import SectionTeam from '@/components/sections/SectionTeam'
import { fetchAbout, fetchSettings, fetchTeam } from '@/config/api'

export default {
  components: {
    SectionAbout,
    SectionTeam
  },
  async asyncData () {
    const res = {
      settings: {},
      about: {},
      team: {}
    }

    try {
      const [
        settings,
        about,
        team
      ] = await Promise.all([
        fetchSettings(),
        fetchAbout(),
        fetchTeam()
      ])

      res.settings = settings
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
