<template>
  <div class="form-wrapper">
    <form
      class="form form-transition"
      :class="{ 'is-loading': isLoading, 'is-hide': isFormSubmited }"
      @submit.prevent="onSubmit"
    >
      <div class="form-control">
        <FormInput
          v-model="formModel.name"
          :error="errors.name || serverErrors.name"
          name="name"
          :placeholder="$locale.form.labelName"
          @input="clearServerError('name')"
        />
      </div>
      <div class="form-control">
        <FormInput
          v-model="formModel.email"
          :error="errors.email || serverErrors.email"
          name="email"
          :placeholder="$locale.form.labelEmail"
          @input="clearServerError('email')"
        />
      </div>
      <div class="form-control">
        <FormInput
          v-model="formModel.phone"
          v-mask="'+7 (###) ###-##-##'"
          :error="errors.phone || serverErrors.phone"
          name="phone"
          :placeholder="$locale.form.labelPhone"
          @input="clearServerError('phone')"
        />
      </div>
      <div class="form-control-submit">
        <Link
          :label="$locale.form.labelSubmit"
          is-big
          is-white
          :is-disabled="isDisabled"
          :disabled="isDisabled"
          :is-button="true"
        />
      </div>
    </form>
    <div
      class="form-result form-transition"
      :class="{ 'is-hide': !isFormSubmited }"
    >
      <vue-markdown :source="$locale.form.successMsg" class="text--t1" />
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/controls/FormInput.vue'
import Link from '@/components/Link.vue'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { sendFeedback } from '@/config/api'
import { AppModelFormPost } from '@/models'

export default {
  name: 'AppForm',
  components: {
    FormInput,
    Link
  },
  data () {
    return {
      serverErrors: {
        name: '',
        email: '',
        phone: ''
      },
      isLoading: false,
      canValidate: false,
      isFormSubmited: false,
      formModel: {
        name: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    errors () {
      return {
        name: (this.canValidate && this.$v?.formModel?.name?.$invalid)
          ? this.$locale.form.errorRequired
          : '',
        email: (this.canValidate && this.$v?.formModel?.email?.$invalid)
          ? this.$locale.form.errorEmail
          : '',
        phone: (this.canValidate && this.$v?.formModel?.phone?.$invalid)
          ? this.$locale.form.errorPhone
          : ''
      }
    },
    hasErrors () {
      return Object.values(this.errors).some(item => !!item) || Object.values(this.serverErrors).some(item => !!item)
    },
    isDisabled () {
      return Object.values(this.formModel).some(item => !item)
    }
  },
  validations: {
    formModel: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        minLength: minLength(18),
        maxLength: maxLength(18)
      }
    }
  },
  methods: {
    clearServerError (key) {
      this.serverErrors[key] = ''
    },
    onSubmit () {
      this.canValidate = true

      if (this.isLoading || this.isFormSubmited || this.hasErrors) {
        return
      }

      this.isLoading = true

      sendFeedback(this.formModel)
        .then(() => {
          this.isFormSubmited = true
        })
        .catch((e) => {
          this.serverErrors = AppModelFormPost.createErrorsFromRaw(e)
          console.error(e)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$rowGapMobile: 4rem;
$rowGap: 6rem;

.form-wrapper {
  position: relative;
}

.form {
  position: relative;
  top: -0.5rem;
  transition: opacity .2s ease;

  &.is-loading {
    opacity: .5;
    pointer-events: none;
  }
}

.form-transition {
  opacity: 1;
  transform: translateY(0);
  transition: opacity .2s ease, transform .2s ease;

  &.is-hide {
    pointer-events: none;
    opacity: 0;
    transform: translateY(1rem);
  }
}

.form-result {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.form-control {
  display: flex;
  width: 100%;
}

.form-control-submit {
  display: flex;
  justify-content: flex-end;
  margin-top: $rowGap;
}

@include mobile {
  .form-control-submit {
    margin-top: $rowGapMobile;
  }
}
</style>
