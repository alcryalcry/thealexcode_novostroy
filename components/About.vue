<template>
  <div class="about">
    <div class="about-body">
      <div class="text--t1 indent">
        {{ body }}
      </div>
      <div>
        <PopupHover :image="alterImage" :body="alterBody" :type="popupHoverTypes.about" />
      </div>
    </div>
    <div class="about-link">
      <Link :label="$locale.about.allProjects" :url="url" />
    </div>
  </div>
</template>

<script>
import { AppModelPopupHover } from '@/models'
import Link from '@/components/Link.vue'
import { ROUTES } from '@/config/constants'
import PopupHover from '@/components/PopupHover.vue'

export default {
  name: 'About',
  components: {
    Link,
    PopupHover
  },
  props: {
    alterImage: {
      type: Object,
      default () {
        return {}
      }
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
    url () {
      return ROUTES.projects
    },
    popupHoverTypes () {
      return AppModelPopupHover.types
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
