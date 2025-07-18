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
  <div class="tabs">
    <button on:click={() => activeTab = 'student'} class:active={activeTab === 'student'}>Student</button>
    <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry</button>
  </div>

  {#if loading}
    <p class="message">Loading entries...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <div class="entries glass">
      {#if activeTab === 'student'}
        {#if studentEntries.length > 0}
          {#each studentEntries as entry}
            <div class="entry-card">
              <h2>{entry.idea_title}</h2>
              <p><strong>Category:</strong> {entry.category}</p>
              <p><strong>Description:</strong> {entry.idea_description}</p>
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Email:</strong> {entry.email}</p>
              <p><strong>User Type:</strong> {entry.usertype}</p>
            </div>
          {/each}
        {:else}
          <p class="message">No student entries found.</p>
        {/if}
      {:else}
        {#if industryEntries.length > 0}
          {#each industryEntries as entry}
            <div class="entry-card">
              <h2>{entry.idea_title}</h2>
              <p><strong>Category:</strong> {entry.category}</p>
              <p><strong>Description:</strong> {entry.idea_description}</p>
              <p><strong>Company:</strong> {entry.company}</p>
              <p><strong>Email:</strong> {entry.email}</p>
              <p><strong>User Type:</strong> {entry.usertype}</p>
            </div>
          {/each}
        {:else}
          <p class="message">No industry entries found.</p>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  .admin-wrapper {
    max-width: 960px;
    margin: 2rem auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Segoe UI', sans-serif;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .tabs button {
    padding: 0.6rem 1.5rem;
    border: none;
    background: #ddd;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
    transition: 0.3s;
  }

  .tabs button.active {
    background: #4b6cb7;
    color: white;
    transform: scale(1.05);
  }

  .entries {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .entry-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    padding: 1.2rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }

  .entry-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  .glass {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(12px);
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .message {
    font-size: 1.1rem;
    color: #333;
    text-align: center;
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    .entry-card {
      padding: 1rem;
    }
    .tabs {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
