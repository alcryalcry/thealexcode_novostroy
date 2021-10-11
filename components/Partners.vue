<template>
  <div class="partners">
    <div class="grid">
      <div class="grid-col-title" data-aos="fade-up">
        <h3 v-if="title" class="title--h1">
          {{ title }}
        </h3>
      </div>
      <div class="grid-col-body">
        <div data-aos="fade-up" data-aos-delay="200">
          <vue-markdown v-if="body" :source="body" class="body text--t1 indent" />
        </div>
        <div class="partners-list">
          <div
            v-for="img, index in imgs"
            :key="img.id"
            class="partners-list-item"
            data-aos="fade-up"
            :data-aos-delay="100 * (index + 1)"
          >
            <picture class="partners-item">
              <img
                v-if="img.url"
                :style="{ aspectRatio: `${img.width} / ${img.height}` }"
                :src="img.absoluteUrl"
                :alt="img.alternativeText"
              >
            </picture>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Partners',
  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    imgs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
$colGapDesktop: $COL_GAP_DESKTOP;
$rowGapDesktop: 3.5rem;
$colGap: 2rem;
$rowGap: 2rem;

.body {
  margin-bottom: 4rem;
}

.partners-list {
  display: grid;
  grid-column-gap: $colGap;
  grid-row-gap: $rowGap;
}

.partners-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  img {
    width: 100%;
    height: auto;
  }
}

@include mobile {
  .partners-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include tablet {
  .partners-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@include desktop {
  .body {
    margin-bottom: 6rem;
  }
  .partners-list {
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: $colGapDesktop;
    grid-row-gap: $rowGapDesktop;
  }
  .partners-list-item {
    @for $i from 1 through 3 {
      &:nth-of-type(3n + #{$i}) {
        grid-column: $i;
      }
    }
  }
}
</style>
