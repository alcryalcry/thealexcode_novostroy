<template>
  <div class="page">
    <Header />

    <main class="page-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>
