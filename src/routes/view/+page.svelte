<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let studentEntries = [];
  let industryEntries = [];
  let activeTab = 'student';
  let loading = true;
  let error = '';

  onMount(async () => {
    const { data, error: fetchError } = await supabase.from('design_ideas').select('*');
    if (fetchError) {
      error = fetchError.message;
    } else {
      studentEntries = data.filter(entry => entry.usertype === 'student');
      industryEntries = data.filter(entry => entry.usertype !== 'student');
    }
    loading = false;
  });
</script>

<div class="admin-wrapper">
  <div class="glass-container">
    <h1>Admin Dashboard</h1>

    <div class="tabs">
      <button class:selected={activeTab === 'student'} on:click={() => activeTab = 'student'}>Students</button>
      <button class:selected={activeTab === 'industry'} on:click={() => activeTab = 'industry'}>Industry</button>
    </div>

    {#if loading}
      <p class="loading">Loading submissions...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else}
      {#if activeTab === 'student'}
        {#if studentEntries.length > 0}
          {#each studentEntries as entry}
            <div class="entry-card">
              <h3>{entry.idea_title}</h3>
              <p><strong>Category:</strong> {entry.category}</p>
              <p><strong>Description:</strong> {entry.idea_description}</p>
            </div>
          {/each}
        {:else}
          <p>No student submissions yet.</p>
        {/if}
      {:else}
        {#if industryEntries.length > 0}
          {#each industryEntries as entry}
            <div class="entry-card">
              <h3>{entry.idea_title}</h3>
              <p><strong>Category:</strong> {entry.category}</p>
              <p><strong>Description:</strong> {entry.idea_description}</p>
            </div>
          {/each}
        {:else}
          <p>No industry submissions yet.</p>
        {/if}
      {/if}
    {/if}
  </div>
</div>

<style>
  .admin-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 1rem;
    background: linear-gradient(to right, #f0f4ff, #ffffff);
    min-height: 100vh;
  }

  .glass-container {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 2.5rem;
    max-width: 850px;
    width: 100%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: #2d2d2d;
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .tabs button {
    padding: 0.7rem 1.8rem;
    font-weight: 600;
    background: #e0e0e0;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tabs button.selected {
    background: #0077ff;
    color: white;
    transform: scale(1.05);
  }

  .entry-card {
    background: white;
    border-radius: 12px;
    padding: 1.2rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .entry-card h3 {
    margin-bottom: 0.6rem;
    font-size: 1.2rem;
  }

  .entry-card p {
    margin: 0.3rem 0;
    line-height: 1.4;
  }

  .loading {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
  }

  .error {
    text-align: center;
    color: red;
    font-weight: bold;
  }
</style>
