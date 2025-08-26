<template>
  <main class="user-section">
    <div class="user-content">
      <h1>Démarrez votre aventure</h1>
      <p>Un guide simple pour découvrir et apprendre de nouvelles compétences, une étape à la fois.</p>
      <p class="pathway-text">Pour commencer votre parcours veuillez vous inscrire ou vous connecter</p>
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
  margin: 20px;
}

.user-content p.pathway-text {
  font-weight: bold;
  color: var(--neon-purple);
  text-shadow: 0 0 5px var(--neon-purple), 0 0 10px var(--neon-purple);
  margin-top: 30px;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (min-width: 1024px) {
  .user-section {
    flex-direction: row;
    gap: 50px;
  }
}
</style>
