<template>
  <div>
    <Navbar @show-modal="isAuthModalVisible = true" />

    <!-- Contenu pour utilisateur connecté -->
    <div v-if="authStore.isAuthenticated" class="authenticated-content">
      <!-- Espace Admin -->
      <AdminDashboard v-if="authStore.user?.role === 'admin'" />

      <!-- Espace Utilisateur Normal -->
      <div v-else class="welcome-section">
        <h2>Bienvenue, {{ authStore.user?.username }} !</h2>
        <p>Vous êtes maintenant connecté à votre espace personnel.</p>
        <!-- Ajoutez ici le contenu pour les utilisateurs connectés -->
      </div>
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
import { useAuthStore } from './stores/auth'; // Assurez-vous que le chemin est correct
import Navbar from './components/Navbar.vue';
import UserSection from './components/UserSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import SignIn from './components/SignIn.vue';
import AdminDashboard from './components/AdminDashboard.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    UserSection,
    FeaturesSection,
    SignIn,
    AdminDashboard,
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
  padding-top: 80px; /* Ajustez selon la hauteur de votre navbar */
}

.guest-content, .authenticated-content {
  min-height: calc(100vh - 80px); /* Compense le padding-top */
}

.welcome-section {
  text-align: center;
  padding: 50px 20px;
  color: var(--text-light);
}

.welcome-section h2 {
  color: var(--neon-blue);
  text-shadow: 0 0 5px var(--neon-blue);
  margin-bottom: 20px;
  font-size: 2.5em;
}

.welcome-section p {
  font-size: 1.2em;
  margin-bottom: 30px;
}
</style>
