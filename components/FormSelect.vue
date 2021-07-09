<template>
  <div class="form-select-provider">
    <VueMultiselect v-model="value" v-bind="settings" :options="mappedOptions" />
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    options: {
      type: Array,
      default () {
        return ['1', '2', '3']
      }
    },
    settings: {
      type: Object,
      default () {
        return ({
          searchable: false
        })
      }
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    mappedOptions () {
      return Array.isArray(this.options)
        ? this.options.map(item => item)
        : []
    }
  },
  methods: {
    onInput () {
      this.$emit(this.value)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
$colorDefault: $COLOR_DARK_GRAY;
$colorFilled: $COLOR_WHITE;
$colorInvalid: $COLOR_RED;

.form-select-provider {
  display: inline-flex;
}

.multiselect {
  display: flex;
  min-height: 5rem;

  &::v-deep {
    .multiselect__content-wrapper {
      width: 28rem;
    }
    .multiselect__input, .multiselect__single {
      font-size: 1.5rem;
      line-height: 1.33;
    }
    .multiselect__tags {
      border: none;
      padding: 0;
      min-height: 5rem;
    }
    .multiselect__placeholder {
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
