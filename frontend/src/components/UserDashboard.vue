<template>
  <div class="user-dashboard">
    <h2>Bienvenue, {{ username }}</h2>

    <!-- Progression -->
    <div class="progress-section">
      <h3>Votre progression</h3>
      <div class="progress-bar">
        <div
          class="progress-bar-fill"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p>{{ progress }}% complété</p>
    </div>

    <!-- Modules -->
    <div class="modules-section">
      <h3>Vos modules</h3>
      <div class="modules-list">
        <div
          v-for="module in modules"
          :key="module._id"
          class="module-card"
        >
          <h4>{{ module.title }}</h4>
          <p>{{ module.description }}</p>

          <!-- Bouton Terminer -->
          <button
            v-if="!completedModules.includes(module._id)"
            @click="completeModule(module._id)"
          >
            Terminer ce module
          </button>

          <!-- Statut Terminé -->
          <span v-else class="completed">✔ Terminé</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";

export default {
  name: "UserDashboard",
  setup() {
    const authStore = useAuthStore();

    // Infos utilisateur
    const username = authStore.user?.username || "Utilisateur";
    const userId = authStore.user?.id || authStore.user?._id; // compatibilité

    // Données
    const modules = ref([]);
    const completedModules = ref([]);

    // Progression calculée
    const progress = computed(() => {
      if (!modules.value.length) return 0;
      return Math.round(
        (completedModules.value.length / modules.value.length) * 100
      );
    });

    // Charger tous les modules
    const fetchModules = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/modules");
        modules.value = res.data;
      } catch (err) {
        console.error("Erreur lors du chargement des modules", err);
      }
    };

    // Charger la progression utilisateur
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/progress/${userId}`
        );
        completedModules.value = res.data.map((p) => p.moduleId);
      } catch (err) {
        console.error("Erreur progression", err);
      }
    };

    // Terminer un module
    const completeModule = async (moduleId) => {
      try {
        await axios.post(
          `http://localhost:9000/api/progress/${userId}/${moduleId}/complete`
        );
        completedModules.value.push(moduleId);
      } catch (err) {
        console.error("Erreur enregistrement progression", err);
      }
    };

    // Charger données au montage
    onMounted(() => {
      fetchModules();
      fetchProgress();
    });

    return {
      username,
      modules,
      progress,
      completeModule,
      completedModules,
    };
  },
};
</script>


<style scoped>
.user-dashboard {
  padding: 40px;
  text-align: center;
  color: var(--text-light);
}

.user-dashboard h2 {
  font-size: 2.5em;
  color: var(--neon-blue);
  text-shadow: 0 0 8px var(--neon-blue);
  margin-bottom: 20px;
}

.user-dashboard h3 {
  font-size: 1.8em;
  margin-top: 40px;
  margin-bottom: 30px;
  color: var(--neon-purple);
  text-shadow: 0 0 6px var(--neon-purple);
}

.progress-section {
  margin: 30px 0;
}

.progress-bar {
  height: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0, 212, 255, 0.5);
  margin: 20px;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  transition: width 0.5s ease-in-out;
  box-shadow: 0 0 10px var(--neon-blue);
}

.modules-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.module-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px var(--neon-blue);
}

.module-card h4 {
  color: var(--neon-blue);
  margin-bottom: 10px;
  text-shadow: 0 0 5px var(--neon-blue);
  font-size: 1.5em;
}

.module-card p {
  margin-bottom: 20px;
}


button {
  background: var(--neon-blue);
  border: none;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #000;
  box-shadow: 0 0 10px var(--neon-blue);
  transition: 0.3s;
}

button:hover {
  background: var(--neon-purple);
  box-shadow: 0 0 15px var(--neon-purple);
  color: #fff;
}

.completed {
  color: var(--neon-blue);
  font-weight: bold;
  text-shadow: 0 0 5px var(--neon-blue);
}
</style>
