<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let activeSection = 'dashboard';
  let file = null;
  let loading = false;
  let success = false;
  let submissions = [];

  onMount(async () => {
    const user = await supabase.auth.getUser();
    if (!user || !user.data.user) goto('/');
    const { data, error } = await supabase.from('submissions').select('*');
    if (!error) submissions = data;
  });

  async function logout() {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<style>
  .glass-box {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
</style>

<div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6 md:p-8">
  <div class="flex flex-col md:flex-row gap-6">
    <aside class="md:w-1/4 w-full bg-white/30 glass-box">
      <nav class="flex flex-col gap-4">
        <button on:click={() => activeSection = 'profile'} class="hover:text-blue-500 font-semibold">Profile</button>
        <button on:click={() => activeSection = 'submit'} class="hover:text-blue-500 font-semibold">Submit Your Idea</button>
        <button on:click={() => activeSection = 'view'} class="hover:text-blue-500 font-semibold">View Your Submissions</button>
        <button on:click={logout} class="text-red-600 font-semibold">Logout</button>
      </nav>
    </aside>

    <main class="flex-1 glass-box bg-white">
      {#if activeSection === 'profile'}
        <h2 class="text-xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p class="text-gray-700">Here you can manage your profile and ideas.</p>
      {/if}

      {#if activeSection === 'submit'}
        <h2 class="text-xl font-bold mb-4">Submit Your Idea</h2>
        <!-- Your idea submission form here -->
        <p class="text-gray-700">Form component goes here.</p>
      {/if}

      {#if activeSection === 'view'}
        <h2 class="text-xl font-bold mb-4">Your Submissions</h2>
        <ul class="space-y-4">
          {#each submissions as submission}
            <li class="p-4 rounded-lg bg-gray-100 shadow-md">
              <h3 class="font-semibold">{submission.idea_title}</h3>
              <p class="text-sm text-gray-600">{submission.category}</p>
            </li>
          {/each}
        </ul>
      {/if}
    </main>
  </div>
</div>
