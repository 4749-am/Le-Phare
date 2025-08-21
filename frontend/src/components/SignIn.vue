<template>
  <div class="modal-overlay" @click.self="$emit('close-modal')">
    <div class="auth-container">
      <form @submit.prevent="handleLogin" class="auth-form">
        <button class="close-btn" @click.prevent="$emit('close-modal')">X</button>
        <h2>{{ isLoginMode ? 'Connexion' : 'Inscription' }}</h2>
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn-submit">
          {{ isLoginMode ? 'Se connecter' : 'S\'inscrire' }}
        </button>
        <p class="switch-mode">
          {{ isLoginMode ? 'Pas de compte ?' : 'Vous avez déjà un compte ?' }}
          <a href="#" @click.prevent="toggleMode">
            {{ isLoginMode ? 'S\'inscrire' : 'Se connecter' }}
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'SignIn',
  emits: ['close-modal'],
  setup() {
    const username = ref('');
    const password = ref('');
    const isLoginMode = ref(true);
    const authStore = useAuthStore();

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value;
      username.value = '';
      password.value = '';
    };

    const handleLogin = async () => {
      console.log("Tentative de connexion ou d'inscription...");
      const endpoint = isLoginMode.value ? '/api/auth/login' : '/api/auth/register';
      const payload = {
        username: username.value,
        password: password.value,
      };

      try {
        const response = await axios.post(endpoint, payload);

        if (response.status === 200 || response.status === 201) {
          console.log(isLoginMode.value ? 'Connexion réussie !' : 'Inscription réussie !', response.data);
          authStore.setToken(response.data.token);
          authStore.setUser(response.data.user);
        } else {
          console.error('Erreur :', response.data.message);
        }
      } catch (error) {
        console.error('Erreur réseau :', error.response ? error.response.data : error.message);
      }
    };

    return { username, password, isLoginMode, handleLogin, toggleMode };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.auth-container {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  position: relative;
}
.auth-form h2 {
  text-align: center;
  color: var(--neon-blue);
  text-shadow: 0 0 5px var(--neon-blue);
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-light);
}
.form-group input {
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: var(--text-light);
  font-family: 'Orbitron', sans-serif;
}
.btn-submit {
  width: 100%;
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  padding: 12px;
  border: none;
  border-radius: 5px;
  color: var(--text-light);
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  font-family: 'Orbitron', sans-serif;
}
.btn-submit:hover {
  box-shadow: var(--button-shadow);
  transform: translateY(-2px);
}
.switch-mode {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9em;
}
.switch-mode a {
  color: var(--neon-purple);
  text-decoration: none;
  font-weight: bold;
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
