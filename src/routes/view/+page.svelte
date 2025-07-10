<script>
  import { onMount } from 'svelte';

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_DESIGN = "jsonbin_design_ideas";      // Faculty + Student
  const BIN_KEY_INDUSTRY = "jsonbin_industry_ideas";  // Industry

  let entries = [];
  let loading = true;
  let error = null;

  async function fetchFromBin(key) {
    const binId = localStorage.getItem(key);
    if (!binId) return [];
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    const json = await res.json();
    return json.record || [];
  }

  onMount(async () => {
    try {
      const [designEntries, industryEntries] = await Promise.all([
        fetchFromBin(BIN_KEY_DESIGN),
        fetchFromBin(BIN_KEY_INDUSTRY)
      ]);
      entries = [...designEntries, ...industryEntries].sort((a, b) =>
        new Date(b.submittedAt) - new Date(a.submittedAt)
      );
    } catch (err) {
      error = "Failed to load submissions.";
      console.error(err);
    } finally {
      loading = false;
    }
  });
</script>

<style>
  .container {
    padding: 40px;
    font-family: 'Poppins', sans-serif;
    max-width: 1100px;
    margin: auto;
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #1e3a8a;
  }

  .card {
    background: rgba(255, 255, 255, 0.45);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(147, 197, 253, 0.4);
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  }

  .card h2 {
    color: #1d4ed8;
    font-size: 1.3rem;
  }

  .meta {
    color: #475569;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .img-preview {
    margin-top: 12px;
    max-width: 100%;
    border-radius: 10px;
  }
</style>

<div class="container">
  <h1>🎯 Submitted Design Ideas</h1>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p style="color:red;">{error}</p>
  {:else if entries.length === 0}
    <p>No submissions found.</p>
  {:else}
    {#each entries as entry}
      <div class="card">
        <h2>{entry.title}</h2>
        <p class="meta"><strong>Submitted By:</strong> {entry.submittedBy || "Unknown"}</p>
        <p class="meta"><strong>Category:</strong> {entry.category}</p>
        {#if entry.otherCategory}
          <p class="meta"><strong>Other Category:</strong> {entry.otherCategory}</p>
        {/if}
        <p><strong>Description:</strong> {entry.description}</p>
        {#if entry.uniqueness}
          <p><strong>Unique?</strong> {entry.uniqueness}</p>
        {/if}
        {#if entry.patentability}
          <p><strong>Patent Info:</strong> {entry.patentability}</p>
        {/if}
        <p><strong>Technologies:</strong> {entry.existingTechnologies}</p>
        <p><strong>Gap Analysis:</strong> {entry.gapAnalysis}</p>
        <p><strong>Market Data:</strong> {entry.Marketingdata}</p>
        {#if entry.visualizedProduct}
          <img class="img-preview" src={entry.visualizedProduct} alt="Visual Preview" />
        {/if}
        <p class="meta">📅 {new Date(entry.submittedAt).toLocaleString()}</p>
      </div>
    {/each}
  {/if}
</div>
