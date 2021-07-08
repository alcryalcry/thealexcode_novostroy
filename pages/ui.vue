<template>
  <div>
    <Section>
      <Container>
        <div class="ui-title text--t1">
          COLORS
        </div>
        <div class="ui-color-list row">
          <div v-for="color in colors" :key="color" class="ui-color" :style="{ background: color }">
            {{ color }}
          </div>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div class="ui-title text--t1">
          ELEMENTS
        </div>
        <Link :label="'linkLabel'" :url="'google.com'" />
      </Container>
    </Section>

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

    <Section>
      <Container>
        <div class="ui-title text--t1">
          COMPOENTS
        </div>
        <WrapperTitle :title="'WrapperTitle'">
          Content of WrapperTitle
        </WrapperTitle>
      </Container>
    </Section>
  </div>
</template>

<script>
import Link from '~/components/Link'
import WrapperTitle from '~/components/WrapperTitle'

export default {
  components: {
    Link,
    WrapperTitle
  },
  data () {
    return {
      colors: [
        'var(--color-white)',
        'var(--color-black)',
        'var(--color-light-gray',
        'var(--color-gray)',
        'var(--color-dark-gray',
        'var(--color-green)'
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
  color: lightcoral;
  width: 10rem;
  height: 10rem;
  margin: 0 1rem;
  overflow: hidden;
}
</style>
