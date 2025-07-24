<script>
  import Header from '$lib/Header.svelte';
  import { onMount } from 'svelte';
   import { get } from 'svelte/store';
   import { goto } from '$app/navigation'; // you missed this import
import { isLoggedIn } from '../stores/login.js'; // Adjust path

  import { user } from '$lib/stores';
  import Footer from '$lib/Footer.svelte';

  onMount(() => {
  if (!get(isLoggedIn)) {
    goto('/'); // Redirect to login
  }
});

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
