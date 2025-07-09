<script>
  import Header from '../lib/Header.svelte';
  import Footer from '../lib/Footer.svelte';
  import About from '../lib/About.svelte';
   import Service from '../lib/Service.svelte';
   import Team from '../lib/Team.svelte';
</script>

<div class="app-wrapper">
  <Header />

  <main class="main-content">
    <slot />
    <About/>
    <Service/>
    <Team/>
  </main>
  
 
  <Footer />
</div>

<style>
  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .main-content {
    flex-grow: 1;
  }
</style>
