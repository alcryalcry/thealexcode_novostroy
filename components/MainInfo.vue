<template>
  <div class="main-info">
    <div class="main-info-title">
      {{ getSettings.title }}
    </div>
    <a class="main-info-link" :href="'tel:' + getSettings.phone" target="_blank">{{ getSettings.phone }}</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainInfo',
  computed: {
    ...mapGetters({
      getSettings: 'getSettings'
    })
  }
}
</script>

<style lang="scss" scoped>
.main-info {
  display: flex;
  transition: color .2s ease;
}

.main-info-title {
  font-size: 1.5rem;
  line-height: 1.33;

}
.main-info-link {
  font-size: 1.5rem;
  line-height: 1.33;
  margin-left: .5rem;
}

@include desktop {
  .main-info {
    flex-flow: column nowrap;
  }

  .main-info-title {
    font-size: 3.2rem;
  }

  .main-info-link {
    font-size: 3rem;
    margin-left: 0;
  }
}
</style>
