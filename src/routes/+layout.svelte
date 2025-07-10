<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<div class="app-wrapper">
  <Header />

  <main class="main-content">
    <slot />
  </main>

  <Footer />
</div>

<style>
  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex-grow: 1;
  }
</style>
