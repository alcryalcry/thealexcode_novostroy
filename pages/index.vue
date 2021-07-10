<template>
  <div class="page-index">
    <SectionAbout :data="about" />
  </div>
</template>

<script>
import SectionAbout from '@/components/sections/SectionAbout'
import { fetchAbout, fetchSettings } from '@/config/api'

export default {
  components: {
    SectionAbout
  },
  async asyncData () {
    const res = {
      settings: {},
      about: {}
    }

    try {
      const [
        settings,
        about
      ] = await Promise.all([
        fetchSettings(),
        fetchAbout()
      ])

      res.settings = settings
      res.about = about
    } catch (e) {
      console.error(e)
    }

    return res
  }
}
</script>

<style lang="scss" scoped>

</style>
