<template>
  <header class="futuristic-header">
    <div class="logo">Le Phare</div>
    <nav>
      <a href="#" class="btn-cta">Connexion / Inscription</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavbarSection',
}
</script>

<style scoped>
.futuristic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
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

@media (max-width: 768px) {
  .futuristic-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
