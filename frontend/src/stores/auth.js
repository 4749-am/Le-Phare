import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUser(user) {
      this.user = user;
    },
    clearAuth() {
      this.user = null;
      this.token = null;
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
