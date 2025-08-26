<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <h1>Tableau de bord Administrateur</h1>
    </div>

    <!-- Statistiques -->
    <div class="stats-grid" v-if="stats">
      <div class="stat-card">
        <h3>{{ stats.totalUsers }}</h3>
        <p>Total Utilisateurs</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.adminUsers }}</h3>
        <p>Administrateurs</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.regularUsers }}</h3>
        <p>Utilisateurs</p>
      </div>
      <div class="stat-card">
        <h3>{{ stats.newUsersThisWeek }}</h3>
        <p>Nouveaux (7j)</p>
      </div>
    </div>

    <!-- Liste des utilisateurs -->
    <div class="users-section">
      <h2>Gestion des Utilisateurs</h2>
      <div class="users-table" v-if="users.length > 0">
        <div class="table-header">
          <span>Nom d'utilisateur</span>
          <span>Rôle</span>
          <span>Inscrit le</span>
          <span>Dernière connexion</span>
          <span>Actions</span>
        </div>
        <div class="table-row" v-for="user in users" :key="user._id">
          <span class="username">{{ user.username }}</span>
          <span class="role" :class="user.role">{{ user.role === 'admin' ? 'Admin' : 'Utilisateur' }}</span>
          <span class="date">{{ formatDate(user.createdAt) }}</span>
          <span class="date">{{ user.lastLogin ? formatDate(user.lastLogin) : 'Jamais' }}</span>
          <div class="actions">
            <button
              @click="toggleRole(user)"
              class="btn-role"
              :disabled="user._id === authStore.user?.id"
            >
              {{ user.role === 'admin' ? '→ User' : '→ Admin' }}
            </button>
            <button
              @click="deleteUser(user)"
              class="btn-delete"
              :disabled="user._id === authStore.user?.id"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <div v-else class="loading">Chargement des utilisateurs...</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  setup() {
    const authStore = useAuthStore();
    const users = ref([]);
    const stats = ref(null);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        users.value = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        stats.value = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des stats:', error);
      }
    };

    const toggleRole = async (user) => {
      const newRole = user.role === 'admin' ? 'user' : 'admin';
      const confirmMessage = `Êtes-vous sûr de vouloir ${newRole === 'admin' ? 'promouvoir' : 'rétrograder'} ${user.username} ?`;

      if (!confirm(confirmMessage)) return;

      try {
        await axios.patch(`/api/admin/users/${user._id}/role`,
          { role: newRole },
          {
            headers: {
              'Authorization': `Bearer ${authStore.token}`
            }
          }
        );
        await fetchUsers();
        await fetchStats();
      } catch (error) {
        alert('Erreur lors du changement de rôle: ' + (error.response?.data?.message || error.message));
      }
    };

    const deleteUser = async (user) => {
      const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ? Cette action est irréversible.`;

      if (!confirm(confirmMessage)) return;

      try {
        await axios.delete(`/api/admin/users/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        await fetchUsers();
        await fetchStats();
      } catch (error) {
        alert('Erreur lors de la suppression: ' + (error.response?.data?.message || error.message));
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    onMounted(() => {
      fetchUsers();
      fetchStats();
    });

    return {
      authStore,
      users,
      stats,
      toggleRole,
      deleteUser,
      formatDate
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 20px;
  color: var(--text-light);
}

.admin-header {
  text-align: center;
  margin-bottom: 40px;
}

.admin-header h1 {
  color: var(--neon-blue);
  text-shadow: 0 0 10px var(--neon-blue);
  font-size: 2.5em;
  margin-bottom: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-card h3 {
  font-size: 2em;
  color: var(--neon-purple);
  text-shadow: 0 0 5px var(--neon-purple);
  margin-bottom: 10px;
}

.users-section h2 {
  color: var(--neon-blue);
  text-shadow: 0 0 5px var(--neon-blue);
  margin-bottom: 20px;
  text-align: center;
}

.users-table {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 2fr;
  gap: 15px;
  padding: 15px 20px;
  align-items: center;
  text-align: center;
}

.table-header {
  background: rgba(0, 212, 255, 0.1);
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.username {
  font-weight: 500;
}

.role {
  padding: 5px 10px;
  border-radius: 15px;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
}

.role.admin {
  background: linear-gradient(90deg, var(--neon-purple), var(--neon-blue));
  color: white;
}

.role.user {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-role, .btn-delete {
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
}

.btn-role {
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  color: white;
}

.btn-delete {
  background: linear-gradient(90deg, #ff4757, #ff6b7a);
  color: white;
}

.btn-role:hover, .btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.btn-role:disabled, .btn-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--neon-blue);
}

@media (max-width: 768px) {
  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .table-header span, .table-row span {
    text-align: center;
  }

  .actions {
    justify-content: center;
  }
}
</style>
