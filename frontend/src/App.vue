<template>
  <div>
    <Navbar @show-modal="isAuthModalVisible = true" />
    <UserSection />
    <FeaturesSection />

    <SignIn v-if="isAuthModalVisible" @close-modal="isAuthModalVisible = false" />
  </div>
</template>

<script>
import { ref } from 'vue'; // Import de 'ref'
import Navbar from './components/Navbar.vue';
import UserSection from './components/UserSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import SignIn from './components/SignIn.vue'; // Import du composant de la modale

export default {
  name: 'App',
  components: {
    Navbar,
    UserSection,
    FeaturesSection,
    SignIn, // Ajout du composant
  },
  setup() {
    const isAuthModalVisible = ref(false);

    return {
      isAuthModalVisible,
    };
  },
};
</script>
