<template>
  <div>
    <Navbar @show-modal="isAuthModalVisible = true" />

    <!-- Contenu pour utilisateur connecté -->
    <div v-if="authStore.isAuthenticated" class="authenticated-content">
      <!-- Espace Admin -->
      <AdminDashboard v-if="authStore.user?.role === 'admin'" />

      <!-- Espace Utilisateur Normal -->
        <UserDashboard v-else />
    </div>

    <!-- Contenu pour utilisateur non connecté -->
    <div v-else class="guest-content">
      <UserSection />
      <FeaturesSection />
    </div>

    <!-- Modal d'authentification -->
    <SignIn v-if="isAuthModalVisible" @close-modal="isAuthModalVisible = false" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from './stores/auth';
import Navbar from './components/Navbar.vue';
import UserSection from './components/UserSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import SignIn from './components/SignIn.vue';
import AdminDashboard from './components/AdminDashboard.vue';
import UserDashboard from './components/UserDashboard.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    UserSection,
    FeaturesSection,
    SignIn,
    AdminDashboard,
    UserDashboard,
  },
  setup() {
    const isAuthModalVisible = ref(false);
    const authStore = useAuthStore();

    return {
      isAuthModalVisible,
      authStore,
    };
  },
};
</script>

<style>
/* Variables CSS globales */
:root {
  --neon-blue: #00d4ff;
  --neon-purple: #9d4edd;
  --text-light: #f0f0f0;
  --button-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  --header-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #0d0d1a 0%, #1a0d33 50%, #0d1a26 100%);
  font-family: 'Orbitron', sans-serif;
  color: var(--text-light);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  padding-top: 80px;
}

.guest-content, .authenticated-content {
  min-height: calc(100vh - 80px);
}

</style>
