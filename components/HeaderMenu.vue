<template>
  <div class="header-menu">
    <Section is-black>
      <Container>
        <div v-bsl:reserveScrollBarGap="isOpen" class="grid">
          <div class="grid-col-title grid-col-info">
            <ContactsInfo />
          </div>
          <div class="grid-col-body">
            <Navigation v-on="$listeners" />
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>

<script>
import ContactsInfo from '@/components/ContactsInfo'
import Navigation from '@/components/Navigation'

export default {
  name: 'HeaderMenu',
  components: {
    ContactsInfo,
    Navigation
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  .section {
    flex: 1;
  }
  .container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
  }
}
.grid {
  flex: 1;
}
.grid-col-body {
  display: grid;
  justify-items: end;
  padding-top: 6rem;
}

@include mobile_tablet {
  .grid {
    display: flex;
    flex-flow: column nowrap;
  }
  .grid-col-title {
    margin-top: auto;
  }
  .grid-col-body {
    order: -1;
    padding-top: 4.5rem;
  }
}
</style>
