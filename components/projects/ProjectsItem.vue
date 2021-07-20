<template>
  <div class="project-item">
    <div class="project-item-tags">
      <span>{{ data.location }}</span>
      <span>{{ data.year }}</span>
    </div>
    <div class="project-item-img">
      <img :src="data.img.url" :alt="data.img.alternativeText">
    </div>
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
      }
    }
  }
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
.project-item-img {
  display: flex;
  width: 100%;
  height: 22rem;
  margin-bottom: $rowGap;
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
  }
}

@include desktop {
  .project-item-tags {
    margin-bottom: $rowGap;
  }
  .project-item-subtitle {
    margin-bottom: $rowGapDesktop;
  }
  .project-item-img {
    height: 27rem;
    margin-bottom: $rowGapDesktop;
  }
}
</style>
