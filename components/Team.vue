<template>
  <div class="team">
    <div class="team-title">
      <h3 v-if="title" class="title--h1">
        {{ title }}
      </h3>
    </div>
    <div class="team-subtitle">
      <p v-if="subtitle" class="text--t3">
        {{ subtitle }}
      </p>
    </div>
    <div class="team-body">
      <vue-markdown v-if="body" :source="body" class="text text--t3" />
      <div v-if="alterImg || alterBody" class="team-popup-hover">
        <PopupHover :img="alterImg" :body="alterBody" :type="popupHoverTypes.team" />
      </div>
    </div>
    <picture class="team-image">
      <img v-if="img.absoluteUrl" :src="img.absoluteUrl" :alt="img.alternativeText">
    </picture>
  </div>
</template>

<script>
import { AppModelPopupHover } from '@/models'
import PopupHover from '@/components/PopupHover.vue'

export default {
  name: 'Team',
  components: {
    PopupHover
  },
  props: {
    img: {
      type: Object,
      default () {
        return {}
      }
    },
    alterImg: {
      type: Object,
      default () {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    alterBody: {
      type: String,
      default: ''
    }
  },
  computed: {
    popupHoverTypes () {
      return AppModelPopupHover.types
    }
  }
}
</script>

<style lang="scss" scoped>
$colorDarkGray: var(--color-dark-gray);
$colGapDesktop: $COL_GAP_DESKTOP;

.team {
  display: grid;
  grid-row-gap: 2rem;
}

.team-body {
  .text {
    color: $colorDarkGray;
  }
}

.team-popup-hover {
  display: flex;
  margin-top: 2rem;
}

@include mobile {
  .team-image {
    margin-top: 2rem;
  }
}

@include tablet {
  .team {
    grid-column-gap: 4rem;
    grid-template-columns: 1fr 33rem;
    grid-template-areas: "title image"
                        "subtitle image"
                        "body image"
                        "bottom image";
  }
  .team-title {
    grid-area: title;
  }
  .team-subtitle {
    grid-area: subtitle;
  }
  .team-body {
    grid-area: body;
  }
  .team-image {
    grid-area: image;
  }
}

@include desktop {
  .team {
    grid-column-gap: $colGapDesktop;
    grid-template-columns: repeat(12, 1fr);
  }
  .team-title {
    grid-column: 1 / span 2;
  }
  .team-subtitle {
    grid-column: 3 / span 2;
  }
  .team-body {
    grid-column: 5 / span 3;
  }
  .team-image {
    grid-column: 8 / span 5;
  }
}
</style>
