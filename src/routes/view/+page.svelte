<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let allEntries = [];
  let studentEntries = [];
  let industryEntries = [];
  let activeTab = 'students';

  const industryKeywords = [
    "New Product Development",
    "New Process Development",
    "New Features in Existing Product",
    "Problems in Existing Product",
    "Problems in Existing Processes"
  ];

  onMount(async () => {
    const { data, error } = await supabase.from('design_ideas').select('*');
    if (!error) {
      allEntries = data;

      studentEntries = allEntries.filter(entry => {
        return !industryKeywords.includes(entry.category);
      });

      industryEntries = allEntries.filter(entry => {
        return industryKeywords.includes(entry.category);
      });
    }
  });
</script>

<style>
  .glass {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
  }

  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .toggle-buttons button {
    margin: 0 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    border: none;
    font-weight: bold;
    background-color: #ddd;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .toggle-buttons button.active {
    background-color: #0070f3;
    color: white;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 1.5rem;
  }

  .card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    color: #0070f3;
  }

  .card p {
    margin: 0.2rem 0;
    word-break: break-word;
  }

  .card strong {
    color: #333;
  }
</style>

<div class="toggle-buttons">
  <button on:click={() => activeTab = 'students'} class:active={activeTab === 'students'}>Student Entries</button>
  <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry Entries</button>
</div>

{#if activeTab === 'students'}
  <div class="card-grid">
    {#each studentEntries as entry}
      <div class="glass card">
        <h3>{entry.idea_title || entry.title || 'No Title'}</h3>
        <p><strong>Category:</strong> {entry.category}</p>
        <p><strong>Description:</strong> {entry.idea_description || entry.description}</p>
        <p><strong>Uniqueness:</strong> {entry.uniqueness}</p>
        <p><strong>Existing Technologies:</strong> {entry.existingTechnologies}</p>
        <p><strong>Gap Analysis:</strong> {entry.gapAnalysis}</p>
        <p><strong>Patentability:</strong> {entry.patentability}</p>
        <p><strong>Marketing Data:</strong> {entry.marketing_data}</p>
        <p><strong>Visualized Product:</strong> {entry.visualized_product}</p>
        <p><strong>Research Data:</strong> {entry.research_data}</p>
        <p><strong>Experimental Data:</strong> {entry.experimental_data}</p>
        <p><strong>Other Category:</strong> {entry.other_category}</p>
      </div>
    {/each}
  </div>
{:else}
  <div class="card-grid">
    {#each industryEntries as entry}
      <div class="glass card">
        <h3>{entry.title || entry.idea_title || 'No Title'}</h3>
        <p><strong>Category:</strong> {entry.category}</p>
        <p><strong>Description:</strong> {entry.description || entry.idea_description}</p>
        <p><strong>Uniqueness:</strong> {entry.uniqueness}</p>
        <p><strong>Existing Tech:</strong> {entry.existingTech}</p>
        <p><strong>Gap Analysis:</strong> {entry.gapAnalysis}</p>
        <p><strong>Patentability:</strong> {entry.patentability}</p>
        <p><strong>Market Data:</strong> {entry.marketData}</p>
        <p><strong>Financials:</strong> {entry.financials}</p>
        <p><strong>Visualized Product:</strong> {entry.visualized_product}</p>
      </div>
    {/each}
  </div>
{/if}
