<template>
  <div>
    <Navbar />
    <UserSection />
    <FeaturesSection />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import UserSection from './components/UserSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    UserSection,
    FeaturesSection,
  },
}
</script>

<style></style>
