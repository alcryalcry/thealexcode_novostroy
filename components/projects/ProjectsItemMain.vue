<template>
  <div class="project-item grid">
    <picture class="project-item-img">
      <img :src="data.img.absoluteUrl" :alt="data.img.alternativeText">
    </picture>
    <div class="project-item-title text--t3">
      {{ data.title }}
    </div>
    <div class="project-item-subtitle text--t2">
      {{ data.subtitle }}
    </div>
    <div class="project-item-right">
      <div class="project-item-tags">
        <span>{{ data.location }}</span>
        <span>{{ data.year }}</span>
      </div>
      <div class="project-item-link">
        <Link
          :label="$locale.projects.detail"
          :url="data.relativeUrl"
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
  background: $colorLightGray;
}

.project-item-link {
  &::v-deep {
    .link {
      position: static;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
    }
  }
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
.project-item-img {
  position: relative;
  display: flex;
  width: 100%;
  max-width: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%);
  }
}
.project-item-title {
  position: relative;
}
.project-item-subtitle {
  position: relative;
}

@include mobile {
  .project-item.grid {
    padding: 0 $offsetMobile 4rem;
    margin: 0 0 - $offsetMobile;
    grid-row-gap: 0;
  }
  .project-item-img {
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
  .project-item-tags {
    position: absolute;
    top: $offsetMobile;
    left: $offsetMobile;
    color: $colorWhite;
  }
}

@include tablet {
  .project-item.grid {
    padding: 0 $offsetTablet 8rem;
    margin: 0 0 - $offsetTablet;
    grid-row-gap: 0;
  }
  .project-item-img {
    width: calc(100% + #{$offsetTablet * 2});
    // left: - $offsetTablet;
    margin: 0 0 - $offsetTablet $rowGapTablet;
    height: 50rem;
  }
  .project-item-right {
    margin-top: $rowGapTablet;
  }
  .project-item-title {
    margin-bottom: .5rem;
  }
  .project-item-tags {
    position: absolute;
    top: $offsetTablet;
    left: $offsetTablet;
    color: $colorWhite;
  }
}

@include desktop {
  .project-item {
    background: $colorWhite;
  }
  .project-item-link {
    &::v-deep {
      .link {
        &::before {
          left: -10rem;
        }
      }
    }
  }
  .project-item-right {
    grid-column: 9 / span 4;
    padding: $offsetDesktop 0;
  }
  .project-item-tags {
    margin-bottom: $rowGapDesktop;
  }
  .project-item-img {
    left: -10rem;
    width: calc(100% + 10rem);
    height: 64rem;
    grid-row: 1 / auto;
    grid-column: 1 / span 8;
    margin-bottom: $rowGapDesktop;
  }
  .project-item-title {
    padding: $offsetDesktop 0;
    grid-row: 1;
    grid-column: 1 / span 2;
    color: $colorWhite;
  }
  .project-item-subtitle {
    padding: $offsetDesktop $offsetDesktop $offsetDesktop 0;
    grid-row: 1;
    grid-column: 3 / span 6;
    margin-bottom: $rowGapDesktop;
    color: $colorWhite;
  }
}
</style>
