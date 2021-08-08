<template>
  <transition name="list-fade" mode="out-in">
    <div v-if="!mappedList.length && isReady" key="1" class="grid">
      <div class="grid-col-full">
        <div class="title--h1">
          {{ $locale.projects.nothing }}
        </div>
      </div>
    </div>
    <div v-else key="2" class="grid">
      <div class="grid-col-full">
        <ProjectsItemMain v-if="mappedList[0]" :data="mappedList[0]" />
      </div>
      <div v-if="mappedList.slice(1).length" class="grid-col-body">
        <div
          v-for="item, index in mappedList.slice(1)"
          :key="item.id"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
        >
          <ProjectsItem :data="item" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ProjectsItem from '@/components/projects/ProjectsItem'
import ProjectsItemMain from '@/components/projects/ProjectsItemMain'

export default {
  name: 'ProjectsGrid',
  components: {
    ProjectsItem,
    ProjectsItemMain
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isReady: false
    }
  },
  computed: {
    mappedList () {
      return this.list.map((item, index) => {
        return {
          ...item,
          isMain: index === 0
        }
      })
    }
  },
  mounted () {
    if (process.browser) {
      this.isReady = true
    }
  }
}
</script>

<style lang="scss" scoped>
$rowGapDesktop: 15rem;
$rowGapTablet: 8rem;
$colGapDesktop: $COL_GAP_DESKTOP;
$colGapTablet: $COL_GAP_TABLET;

@include mobile {
  .grid {
    grid-row-gap: 0;
  }
}

@include tablet_desktop {
  .grid-col-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@include tablet {
  .grid {
    grid-row-gap: $rowGapTablet;
  }
  .grid-col-body {
    grid-column-gap: $colGapTablet;
    grid-row-gap: $rowGapTablet;
  }
}

@include desktop {
  .grid {
    grid-row-gap: $rowGapDesktop;
  }
  .grid-col-body {
    grid-column-gap: $colGapDesktop;
    grid-row-gap: $rowGapDesktop;
  }
}
</style>
