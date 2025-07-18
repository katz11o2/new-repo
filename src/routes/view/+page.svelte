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
    const { data, error } = await supabase
      .from('design_ideas')
      .select('*')
      .order('created_at', { ascending: false }); // Latest on top

    if (!error && data) {
      allEntries = data;

      studentEntries = allEntries
        .filter(entry => !industryKeywords.includes(entry.category))
        .map((entry, index) => ({ ...entry, number: index + 1 }));

      industryEntries = allEntries
        .filter(entry => industryKeywords.includes(entry.category))
        .map((entry, index) => ({ ...entry, number: index + 1 }));
    }
  });
</script>

<style>
  body {
    padding-top: 50px;
    padding-bottom: 50px;
    font-family: 'Segoe UI', sans-serif;
  }

  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding-top: 2rem;
    gap: 1rem;
  }

  .toggle-buttons button {
    padding: 0.8rem 1.8rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    background-color: #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toggle-buttons button.active {
    background-color: #0070f3;
    color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    gap: 2rem;
    padding: 2rem 2rem;
   
  }

  .card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card h3 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #0055cc;
    margin-bottom: 0.5rem;
  }

  .card p {
    margin: 0.4rem 0;
    line-height: 1.4;
    word-wrap: break-word;
  }

  .card strong {
    color: #222;
  }

  .entry-number {
    background: #0070f3;
    color: white;
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
</style>

<!-- Toggle Section -->
<div class="toggle-buttons">
  <button on:click={() => activeTab = 'students'} class:active={activeTab === 'students'}>Student Entries</button>
  <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry Entries</button>
</div>

<!-- Student Entries -->
{#if activeTab === 'students'}
  <div class="card-grid">
    {#each studentEntries as entry (entry.id)}
      <div class="card">
        <div class="entry-number">#{entry.number}</div>
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
  <!-- Industry Entries -->
  <div class="card-grid">
    {#each industryEntries as entry (entry.id)}
      <div class="card">
        <div class="entry-number">#{entry.number}</div>
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
