<template>
  <header class="futuristic-header">
    <div class="logo">Le Phare</div>
    <nav>
      <span v-if="authStore.isAuthenticated && authStore.user" class="username-display">
        Bienvenue, {{ authStore.user.username }} !
      </span>

      <button v-if="!authStore.isAuthenticated" class="btn-cta" @click="$emit('show-modal')">
        Connexion / Inscription
      </button>

      <button v-else class="btn-cta" @click="logout">
        Déconnexion
      </button>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'NavbarSection',
  emits: ['show-modal'],
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.clearAuth();
      router.push('/');
    };

    return {
      authStore,
      logout,
    };
  },
};
</script>

<style scoped>
.futuristic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(13, 13, 26, 0.7);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: var(--header-shadow);
}

.logo {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--neon-blue);
  text-shadow: 0 0 5px var(--neon-blue);
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.username-display {
  color: var(--text-light);
  font-size: 1.05em;
  font-weight: 500;
  margin-right: 20px;
}

.btn-cta {
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  padding: 8px 16px;
  margin-right: 50px;
  border: none;
  border-radius: 5px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.05em;
  color: var(--text-light);
  text-decoration: none;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
}

.btn-cta:hover {
  box-shadow: var(--button-shadow);
  cursor: pointer;
}

@media (max-width: 768px) {
  .futuristic-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
