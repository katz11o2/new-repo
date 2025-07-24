<script>
  import Header from '$lib/Header.svelte';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { isLoggedIn } from '../stores/login.js';
  import { user } from '$lib/stores';
  import Footer from '$lib/Footer.svelte';
  import { supabase } from '$lib/supabaseClient';

  let showPage = false;

  const allowedEmails = ['thiruvenkat.er@gmail.com']; // ✅ Change this to your Gmail

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (session && user && allowedEmails.includes(user.email)) {
      showPage = true;
    } else {
      goto('/');
    }
  });
</script>

{#if showPage}
  <div class="app-wrapper">
    <Header />

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
{/if}

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
