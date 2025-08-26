<template>
  <main class="user-section">
    <div class="user-content">
      <h1>Démarrez votre aventure</h1>
      <p>Un guide simple pour découvrir et apprendre de nouvelles compétences, une étape à la fois.</p>
      <button class="btn-cta">Commencez votre parcours</button>
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
}

.user-content {
  text-align: center;
  width: 100%;
}

.user-content h1 {
  font-size: 3.5em;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--neon-blue);
  text-shadow: 0 0 10px var(--neon-blue);
  text-align: center;
}

.user-content p {
  font-size: 1.5em;
  line-height: 1.6;
  margin: 40px;
}

.btn-cta {
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  color: var(--text-light);
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1em;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  white-space: nowrap;
}

.btn-cta:hover {
  box-shadow: var(--button-shadow);
  cursor: pointer;
}

@media (min-width: 1024px) {
  .user-section {
    flex-direction: row;
    gap: 50px;
  }
}
</style>
