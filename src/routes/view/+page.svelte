<script>
  import { onMount } from 'svelte';

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_STORAGE = "jsonbin_design_ideas";

  let entries = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    const binId = localStorage.getItem(BIN_KEY_STORAGE);
    if (!binId) {
      error = "No submissions found.";
      loading = false;
      return;
    }

    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY }
      });
      const json = await res.json();
      entries = json.record || [];
    } catch (e) {
      error = "Failed to fetch submissions.";
    } finally {
      loading = false;
    }
  });
</script>

<style>
  .container {
    padding: 40px 20px;
    max-width: 1100px;
    margin: auto;
    font-family: 'Poppins', sans-serif;
  }

  h1 {
    text-align: center;
    font-size: 2.5rem;
    color: #1e3a8a;
    margin-bottom: 30px;
  }

  .card {
    background: rgba(255, 255, 255, 0.45);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(147, 197, 253, 0.4);
    transition: 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.15);
  }

  .card h2 {
    font-size: 1.4rem;
    color: #1d4ed8;
    margin-bottom: 10px;
  }

  .meta {
    font-size: 0.9rem;
    color: #475569;
    margin-bottom: 10px;
  }

  .img-preview {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-top: 12px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }

  .error, .loading {
    text-align: center;
    color: #dc2626;
    font-weight: bold;
    margin-top: 40px;
  }
</style>

<div class="container">
  <h1>🎯 Submitted Design Ideas</h1>

  {#if loading}
    <p class="loading">Loading submissions...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if entries.length === 0}
    <p class="error">No entries found.</p>
  {:else}
    <div class="grid">
      {#each entries as entry, index}
        <div class="card">
          <h2>{entry.title}</h2>
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
            <img class="img-preview" src={entry.visualizedProduct} alt="Uploaded Visual" />
          {/if}
          <p class="meta">Submitted on {new Date(entry.submittedAt).toLocaleString()}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
