<template>
  <component :is="disabled ? 'div' : 'n-link'" :to="!disabled ? url : false" class="link" :class="{ 'is-big': isBig, 'is-disabled': disabled }">
    <span class="link-label" :label="label" :class="isBig ? 'text--t1' : 'text--t3'">
      {{ label }}
    </span>
    <i class="link-icon">
      <IconArrow />
    </i>
  </component>
</template>

<script>
import IconArrow from '@/assets/svg/arrow.svg'

export default {
  name: 'Link',
  components: {
    IconArrow
  },
  props: {
    isBig: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$colorDisabled: var(--color-light-gray);

.link {
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;

  &.is-disabled {
    pointer-events: none;
    color: $colorDisabled;
  }

  &.is-big {
    .link-label {
      margin-right: 1.4rem;
    }
    .link-icon {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
}

.link-label {
  margin-right: .5rem;
  will-change: transform;
  transform: translateY(0);
  transition: transform .5s ease;

  &::before {
    content: attr(label);
    position: absolute;
    top: -1.5em;
    left: 0;
  }
}

.link-icon {
  width: 1.6rem;
  height: 1.6rem;
}

@include mobile {
}

@include tablet {
}

@include desktop {
  .link {
    &:hover {
      .link-label {
        transform: translateY(1.5em);
      }
    }
  }
}
</style>
