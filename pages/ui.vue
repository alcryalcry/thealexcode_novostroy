<template>
  <div>
    <div class="ui-title text--t1">
      COLORS
    </div>
    <Section>
      <Container>
        <div class="ui-color-list row">
          <div v-for="color in colors" :key="color" class="ui-color" :style="{ background: color }">
            {{ color }}
          </div>
        </div>
      </Container>
    </Section>

    <div class="ui-title text--t1">
      ELEMENTS
    </div>
    <Section>
      <Container>
        <div class="ui-element ui-bg-0">
          <FormInput :placeholder="'Ваш имя?'" :name="'name'" />
        </div>
        <div class="ui-element ui-bg-0">
          <FormInput :placeholder="'Ваш имя?'" :name="'name'" :error="'Текст ошибки'" />
        </div>
        <div class="ui-element">
          <FormSelect :options="[{id: 'this is id', label: 'this is label'}, '2020', '2019', 'Максимально возможный текст, который не влезает', '111', '22222222', '4234234']" />
        </div>
        <div class="ui-element">
          <Link :label="'linkLabel'" :url="'/'" />
        </div>
        <div class="ui-element">
          <Link :label="'link disabled'" :disabled="true" :url="'/'" />
        </div>
        <div class="ui-element">
          <Link :label="'linkLabel isBig'" :url="'/'" :is-big="true" />
        </div>
      </Container>
    </Section>

    <div class="ui-title text--t1">
      SECTION/CONTAINER
    </div>
    <Section class="ui-bg-1">
      <div class="text--h2">
        section
      </div>
      <Container class="ui-bg-2">
        <div class="text--h2">
          container
        </div>
      </Container>
    </Section>
  </div>
</template>

<script>
import Link from '@/components/Link'
import FormInput from '@/components/controls/FormInput'
import FormSelect from '@/components/controls/FormSelect'

export default {
  components: {
    Link,
    FormInput,
    FormSelect
  },
  data () {
    return {
      colors: [
        'var(--color-white)',
        'var(--color-black)',
        'var(--color-light-gray',
        'var(--color-gray)',
        'var(--color-dark-gray',
        'var(--color-green)',
        'var(--color-red)'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-bg-1 {
  background: lightpink;
}
.ui-bg-2 {
  background: lightcyan;
}
.ui-bg-3 {
  background: lightsalmon;
}
.ui-bg-4 {
  background: lightsteelblue;
}
.ui-bg-0 {
  background: black;
}

.ui-element {
  margin: 2rem 0;
}

.ui-title {
  margin: 2rem 0;
  border-bottom: 1px solid;
}
.ui-color {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  border: 1px solid black;
  width: 10rem;
  height: 10rem;
  margin: 0 1rem;
  overflow: hidden;
  text-shadow: 1px 1px 1px white;
}
</style>
