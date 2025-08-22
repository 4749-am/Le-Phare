import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },

  actions: {
    setToken(token) {
      this.token = token;
      // Sauvegarder dans localStorage
      if (token) {
        localStorage.setItem('auth-token', token);
      } else {
        localStorage.removeItem('auth-token');
      }
    },

    setUser(user) {
      this.user = user;
      // Sauvegarder dans localStorage
      if (user) {
        localStorage.setItem('auth-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('auth-user');
      }
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
    },

    // Initialiser l'état depuis localStorage
    initAuth() {
      const token = localStorage.getItem('auth-token');
      const userStr = localStorage.getItem('auth-user');

      if (token) {
        this.token = token;
      }

      if (userStr) {
        try {
          this.user = JSON.parse(userStr);
        } catch (e) {
          console.error('Erreur parsing user data:', e);
          this.clearAuth();
        }
      }
    }
  }
});
