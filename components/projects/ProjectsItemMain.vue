<template>
  <div class="project-item grid" :class="{ 'is-hovering': isHovering }">
    <NuxtLink
      class="project-item-img-wrapper"
      :to="data.relativeUrl"
      data-aos="fade-up"
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
    <div class="project-item-title text--t3" data-aos="fade-up">
      {{ data.title }}
    </div>
    <div class="project-item-subtitle text--t1" data-aos="fade-up">
      {{ data.subtitle }}
    </div>
    <div class="project-item-right">
      <div class="project-item-tags" data-aos="fade-up">
        <span>{{ data.location }}</span>
        <span>{{ data.year }}</span>
      </div>
      <div class="project-item-link" data-aos="fade-up">
        <Link
          :label="$locale.projects.detail"
          :url="data.relativeUrl"
          @mouseover.native="onMouseOver"
          @mouseleave.native="onMouseLeave"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectItemMain',
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
$colorLightGray: var(--color-light-gray);
$colorWhite: var(--color-white);
$rowGapDesktop: 2.5rem;
$rowGapTablet: 4rem;
$rowGapMobile: 2rem;
$offsetDesktop: 4rem;
$offsetTablet: $CONTAINER_SIDE_OFFSET_TABLET;
$offsetMobile: $CONTAINER_SIDE_OFFSET_MOBILE;

.project-item {
  position: relative;
  pointer-events: none;
  background: $colorLightGray;
}

.project-item-tags {
  display: flex;
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
.project-item-right {
  pointer-events: auto;
}
.project-item-link {
  pointer-events: auto;
}
.project-item-img-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  max-width: none;
  pointer-events: auto;
  overflow: hidden;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    z-index: 3;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%);
  }
}
.project-item-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  transform: scale(1);
  transform-origin: center;
  transition: transform .5s ease;

  .is-hovering & {
    transform: scale(1.04) translate3d(0,0,0);
  }
}

.project-item-title {
  position: relative;
  z-index: 2;
}
.project-item-subtitle {
  position: relative;
  z-index: 2;
}

@include mobile {
  .project-item.grid {
    padding: 0 $offsetMobile 4rem;
    margin: 0 0 - $offsetMobile;
    grid-row-gap: 0;
  }
  .project-item-img-wrapper {
    width: calc(100% + #{$offsetMobile * 2});
    margin: 0 0 - $offsetMobile $rowGapMobile;
    height: 28rem;
  }
  .project-item-right {
    margin-top: $rowGapMobile;
  }
  .project-item-title {
    margin-bottom: .5rem;
  }
  .project-item-subtitle {
    font-size: 20px;
    line-height: 1.5;
  }
  .project-item-tags {
    position: absolute;
    top: $offsetMobile;
    left: $offsetMobile;
    color: $colorWhite;
    z-index: 2;
  }
}

@include tablet {
  .project-item.grid {
    padding: 0 $offsetTablet 8rem;
    margin: 0 0 - $offsetTablet;
    grid-row-gap: 0;
  }
  .project-item-img-wrapper {
    width: calc(100% + #{$offsetTablet * 2});
    margin: 0 0 - $offsetTablet $rowGapTablet;
    height: 50rem;
  }
  .project-item-right {
    margin-top: 2.5rem;
  }
  .project-item-title {
    margin-bottom: .5rem;
  }
  .project-item-subtitle {
    margin-top: .5rem;
    font-size: 20px;
    line-height: 1.5;
  }
  .project-item-tags {
    position: absolute;
    top: $offsetTablet;
    left: $offsetTablet;
    color: $colorWhite;
    z-index: 2;
  }
}

@include desktop {
  .project-item {
    background: $colorWhite;
  }
  .project-item-right {
    grid-column: 9 / span 4;
    padding: $offsetDesktop 0;
  }
  .project-item-tags {
    margin-bottom: $rowGapDesktop;
  }
  .project-item-img-wrapper {
    left: -10rem;
    width: calc(100% + 10rem);
    height: 64rem;
    grid-row: 1 / auto;
    grid-column: 1 / span 8;
  }
  .project-item-title {
    padding: $offsetDesktop 0;
    grid-row: 1;
    grid-column: 1 / span 2;
    color: $colorWhite;
  }
  .project-item-subtitle {
    padding: 3.5rem 5rem $offsetDesktop 0;
    grid-row: 1;
    grid-column: 3 / span 6;
    margin-bottom: $rowGapDesktop;
    color: $colorWhite;
  }
}
</style>
