<template>
  <nav class="nav">
    <div v-for="item in filteredLinks" :key="item.label" class="nav-item text--t1">
      <NuxtLink v-bind="item" @click.native="onClick">
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
import { RouteMap } from '@/config/constants'

export default {
  name: 'Navigation',
  computed: {
    filteredLinks () {
      return RouteMap.filter(item => this.$route.name !== item.routeName).map((item) => {
        return {
          ...item,
          to: item.routeName ? { name: item.routeName } : { hash: item.anchor }
        }
      })
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-item {
  text-align: right;
  & + .nav-item {
    margin-top: 1rem;
  }
}
</style>
