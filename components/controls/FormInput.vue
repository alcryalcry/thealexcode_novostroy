<template>
  <div class="form-input-provider">
    <label class="form-input text--t3" :class="{ 'is-filled': isFilled, 'is-error': error }">
      <input v-model="value" :type="type" :name="name" class="form-input-control" @input="onInput">
      <p class="form-input-placeholder">{{ placeholder }}</p>
      <p v-if="error" class="form-input-error">{{ error }}</p>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'placeholder'
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    isFilled () {
      return !!this.value.length
    }
  },
  methods: {
    onInput () {
      this.$emit(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
$colorDefault: var(--color-light-gray);
$colorFilled: var(--color-white);
$colorInvalid: var(--color-red);

.form-input-provider {
  position: relative;
  display: inline-flex;
}

.form-input {
  display: flex;
  margin: 2.5rem 0;
  color: $colorDefault;

  &.is-filled {
    color: $colorFilled;
  }

  &.is-error {
    .form-input-control {
      border-color: $colorInvalid;
    }
  }
}

.form-input-control {
  padding: .5rem 0;
  background-color: transparent;
  color: currentColor;
  border: none;
  border-bottom: 1px solid currentColor;
  outline: none;
  transition: color .2s ease, border-color .2s ease;

  &:focus {
    color: $colorFilled;
  }
}

.form-input-placeholder {
  position: absolute;
  top: 2rem;
  left: 0;
  margin: 0;
  color: $colorDefault;
  pointer-events: none;
  transform: scale(1);
  transform-origin: left;
  transition: .2s ease;
}

.form-input-error {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  color: $colorInvalid;
  pointer-events: none;
  transform: scale(0.8);
  transform-origin: left;
}

.form-input-control:focus ~ .form-input-placeholder,
.form-input.is-filled .form-input-placeholder {
  top: 0.4rem;
  transform: scale(0.8);
}

@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
