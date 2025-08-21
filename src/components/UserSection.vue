<template>
  <main class="user-section">
    <div class="user-content">
      <h1>Tracez votre chemin vers l'expertise</h1>
      <p>Votre guide pour maîtriser n'importe quelle compétence...</p>
      <a href="#" class="btn-cta">Commencez votre parcours</a>
    </div>
  </main>
</template>

<script>
export default {
  name: 'UserSection',
}
</script>

<style scoped>
.user-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  padding-top: 80px;
}

.user-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
}

.user-content h1 {
  font-size: 3.5em;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
  color: var(--neon-blue);
  text-shadow: 0 0 10px var(--neon-blue);
}

.user-content p {
  font-size: 1.5em;
  line-height: 1.6;
  margin: 20px 0 30px;
}

.btn-cta {
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  padding: 8px 16px;
  border-radius: 5px;
  color: var(--text-light);
  text-decoration: none;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  white-space: nowrap;
}

.btn-cta:hover {
  box-shadow: var(--button-shadow);
  transform: translateY(-2px);
}

@media (min-width: 1024px) {
  .user-section {
    flex-direction: row;
    gap: 50px;
  }
}
</style>
