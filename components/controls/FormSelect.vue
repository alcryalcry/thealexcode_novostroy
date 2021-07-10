<template>
  <div class="form-select-provider">
    <VueMultiselect
      v-if="mappedOptions.length"
      :value="value"
      v-bind="computedSettings"
      :options="mappedOptions"
      @select="onSelect"
    >
      <template #placeholder>
        <span class="multiselect__placeholder">
          {{ computedSettings.placeholder }}
        </span>
      </template>
      <template #caret>
        <i class="multiselect__caret"><IconCaret /></i>
      </template>
    </VueMultiselect>
  </div>
</template>

<script>
import { AppModelSelect } from '@/models'
import IconCaret from '@/assets/svg/caret.svg'

const DEFAULT_ID = 'DEFAULT_PLACEHOLDER_ID'

const DEFAULT_SETTINGS = {
  searchable: false,
  showLabels: false,
  trackBy: 'id',
  label: 'label',
  placeholder: 'Выбрать'
}

export default {
  name: 'FormSelect',
  components: {
    IconCaret
  },
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    settings: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      value: {}
    }
  },
  computed: {
    computedSettings () {
      return {
        ...DEFAULT_SETTINGS,
        ...this.settings
      }
    },
    mappedOptions () {
      return [
        AppModelSelect.createFromRaw({ id: DEFAULT_ID, label: this.computedSettings.placeholder }),
        ...AppModelSelect.createListFromRaw(this.options)
      ]
    }
  },
  mounted () {
    this.setSelectValue(this.mappedOptions[0])
  },
  methods: {
    setSelectValue (val) {
      this.$set(this, 'value', val)
    },
    onSelect (e) {
      this.setSelectValue(e)

      this.$emit('select', e)

      if (e.id === DEFAULT_ID) {
        this.$emit('clear-select')
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
$colorDefault: var(--color-black);
$colorHighlight: var(--color-light-gray);
$selectMinHeight: 5rem;
$selectMaxWidth: 28rem;

.form-select-provider {
  display: inline-flex;
}

.multiselect {
  display: flex;
  align-items: center;
  min-height: $selectMinHeight;
  max-width: $selectMaxWidth;
  cursor: pointer;

  &.multiselect--active {
    &::v-deep {
      .multiselect__placeholder {
        display: inline-block;
      }
      .multiselect__caret {
        transform: rotate(0);
      }
    }
  }

  &::v-deep {
    .multiselect__caret {
      margin-left: .5rem;
      width: 1.6rem;
      height: 1.6rem;
      transform: rotate(180deg);
      transition: transform .2s ease;
    }
    .multiselect__content-wrapper {
      width: $selectMaxWidth;
      max-height: 26rem !important;
      overflow-x: hidden;
      border: none;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      padding: .5rem 0;
      border-radius: 0;
    }
    .multiselect__content {
      width: 100%;
    }
    .multiselect__tags {
      order: -1;
      border: none;
      padding: 0;
      min-height: 0;
      max-width: calc(#{$selectMaxWidth} - 2.1rem);
    }
    .multiselect__element {
      width: 100%;
      height: $selectMinHeight;
    }
    .multiselect__option {
      display: flex;
      align-items: center;
      width: 100%;
      height: $selectMinHeight;
      padding: 1.5rem 2rem;
      &.multiselect__option--selected,
      &.multiselect__option--highlight {
        font-weight: 400;
        background: $colorHighlight;
        color: $colorDefault;
      }
      > * {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .multiselect__option {
      font-size: 1.5rem;
      line-height: 1.33;
      margin: 0;
    }
    .multiselect__single {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .multiselect__single,
    .multiselect__input,
    .multiselect__placeholder {
      color: $colorDefault;
      font-size: 1.5rem;
      line-height: 1.33;
      padding: 0;
      margin: 0;
    }
  }
}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
