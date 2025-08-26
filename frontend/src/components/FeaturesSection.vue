<template>
  <section class="features-section">
    <h2>Comment Le Phare vous guide ?</h2>
    <div class="features-grid">
      <div class="feature-item">
        <h3>Votre première balise</h3>
        <p>Débutez votre aventure avec des parcours clairs.<br>Pas de jargon, juste des étapes simples pour commencer.</p>
      </div>
      <div class="feature-item">
        <h3>Trouvez le bon chemin</h3>
        <p>
          Accédez à des ressources gratuites et vérifiées.<br>
          Notre communauté sélectionne les meilleurs articles et tutoriels pour chaque compétence.
        </p>
      </div>
      <div class="feature-item">
        <h3>Échangez avec l'équipage</h3>
        <p>
          Rejoignez une communauté bienveillante pour partager vos créations, poser vos questions et progresser ensemble.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
}
</script>

<style scoped>
.features-section {
  padding: 0 30px 50px 30px;
  text-align: center;
}

.features-section h2 {
  font-size: 2.5em;
  color: var(--neon-purple);
  text-shadow: 0 0 8px var(--neon-purple);
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  text-align: center;
}

.feature-item {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
  cursor: pointer;
}

.feature-item h3 {
  color: var(--neon-blue);
  margin-bottom: 10px;
  font-size: 1.3em;
  text-align: center;
}

.feature-item p {
  line-height: 1.5;
}
</style>
