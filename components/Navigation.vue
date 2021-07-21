<template>
  <nav class="nav">
    <div v-for="item in filteredLinks" :key="item.label" class="nav-item text--t1">
      <NuxtLink v-bind="item" class="nav-item-link" @click.native="onClick">
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

.nav-item-link {
  position: relative;
  padding-left: 3rem;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: calc(50% - 0.8rem);
    opacity: 0;
    pointer-events: none;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
    background: currentColor;
    transform: translateX(-4px);
    transition: opacity .2s ease, transform .2s ease;
  }
  &:active {
    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

@include desktop {
  .nav-item-link {
    &:hover {
      &::before {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
