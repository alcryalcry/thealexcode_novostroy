<template>
  <div class="project-item" :class="{ 'is-hovering': isHovering }">
    <div class="project-item-tags">
      <span>{{ data.location }}</span>
      <span>{{ data.year }}</span>
    </div>
    <NuxtLink
      class="project-item-img-wrapper"
      :to="data.relativeUrl"
      @mouseover.native="onMouseOver"
      @mouseleave.native="onMouseLeave"
    >
      <img
        v-if="data.img.url"
        class="project-item-img"
        :src="data.img.absoluteUrl"
        :alt="data.img.alternativeText"
      >
    </NuxtLink>
    <div class="project-item-title text--t3">
      {{ data.title }}
    </div>
    <div class="project-item-subtitle text--t2">
      {{ data.subtitle }}
    </div>
    <div class="project-item-link">
      <Link
        :label="$locale.projects.detail"
        :url="data.relativeUrl"
        @mouseover.native="onMouseOver"
        @mouseleave.native="onMouseLeave"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isHovering: false
    }
  },
  methods: {
    onMouseOver () {
      this.isHovering = true
    },
    onMouseLeave () {
      this.isHovering = false
    }
  }
}
</script>

<style lang="scss" scoped>
$colorGray: var(--color-gray);
$colorDarkGray: var(--color-dark-gray);
$offsetMobile: $CONTAINER_SIDE_OFFSET_MOBILE;
$rowGapDesktop: 2.5rem;
$rowGap: 2rem;

.project-item {
  position: relative;
}

.project-item-tags {
  display: flex;
  margin-bottom: $rowGap;
  color: $colorDarkGray;
  > * {
    & + * {
      padding-left: .5rem;
      &::before {
        content: ',';
        position: relative;
        left: -.5rem;
      }
    }
  }
}
.project-item-img-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 22rem;
  margin-bottom: $rowGap;
}
.project-item-img {
  transform: scale(1);
  transform-origin: center;
  transition: transform .5s ease;

  .is-hovering & {
    transform: scale(1.04) translate3d(0,0,0);
  }
}
.project-item-title {
  color: $colorDarkGray;
}
.project-item-subtitle {
  margin-bottom: $rowGap;
}

@include mobile {
  .project-item {
    padding: 4rem $offsetMobile;
    margin: 0 0 - $offsetMobile;
    border-bottom: 1px solid $colorGray;

    &:last-of-type {
      padding-bottom: 0;
      border: none;
    }
  }
}

@include desktop {
  .project-item-tags {
    margin-bottom: $rowGap;
  }
  .project-item-subtitle {
    margin-bottom: $rowGapDesktop;
  }
  .project-item-img-wrapper {
    height: 27rem;
    margin-bottom: $rowGapDesktop;
  }
}
</style>
