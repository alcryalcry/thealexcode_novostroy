<template>
  <nav class="nav">
    <div v-for="item in filteredLinks" :key="item.label" class="nav-item text--t1">
      <component
        :is="item.component"
        v-bind="item"
        class="nav-item-link"
        v-on="{ [item.eventName]: onClick }"
      >
        {{ item.label }}
      </component>
    </div>
  </nav>
</template>

<script>
import { RouteMap } from '@/config/constants'

export default {
  name: 'Navigation',
  computed: {
    filteredLinks () {
      return RouteMap.map((item) => {
        const isNunkLink = !!item.routeName
        return {
          ...item,
          component: isNunkLink ? 'NuxtLink' : 'a',
          eventName: isNunkLink ? 'click.native' : 'click',
          to: { name: item.routeName },
          href: item.anchor
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
  cursor: pointer;
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
  &.nuxt-link-active {
    pointer-events: none;
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
