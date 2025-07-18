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

<div class="admin-container">
  <div class="tabs">
    <button on:click={() => activeTab = 'student'} class:active={activeTab === 'student'}>Student Entries</button>
    <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry Entries</button>
  </div>

  {#if loading}
    <p>Loading entries...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <div class="entries glass">
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
          <p>No student entries found.</p>
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
          <p>No industry entries found.</p>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  .admin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-family: sans-serif;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .tabs button {
    padding: 0.6rem 1.5rem;
    border: none;
    background: #e0e0e0;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
  }

  .tabs button.active {
    background: #0077ff;
    color: white;
  }

  .entries {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .entry-card {
    padding: 1rem;
    border-radius: 1rem;
    background: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  .error {
    color: red;
  }
</style>

