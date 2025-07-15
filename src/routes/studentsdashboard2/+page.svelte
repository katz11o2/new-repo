<script>
  import { onMount } from 'svelte';

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_STORAGE = "jsonbin_design_ideas";
  let userEmail = "";
  let userSubmissions = [];
  let error = "";
  let loading = true;

  async function fetchUserData() {
    try {
      const binId = localStorage.getItem(BIN_KEY_STORAGE);
      if (!binId) {
        error = "No data bin found.";
        loading = false;
        return;
      }

      const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
          'X-Master-Key': MASTER_KEY
        }
      });

      const json = await res.json();
      const allRecords = json.record || [];

      const token = window.googleToken;
      if (!token) {
        error = "Google token not found.";
        loading = false;
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      userEmail = payload.email;

      userSubmissions = allRecords.filter(entry => entry.submittedByEmail === userEmail);
    } catch (err) {
      console.error(err);
      error = "❌ Failed to load data.";
    } finally {
      loading = false;
    }
  }

  onMount(fetchUserData);
</script>

<style>
  .dashboard {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #1e3a8a;
  }
  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-left: 6px solid #3b82f6;
  }
  .card h2 {
    margin: 0;
    font-size: 1.4rem;
    color: #0f172a;
  }
  .card p {
    margin: 0.4rem 0;
    color: #334155;
  }
  .image-preview {
    max-width: 300px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
</style>

<div class="dashboard">
  <h1>📂 Your Submitted Design Ideas</h1>

  {#if loading}
    <p>🔄 Loading your submissions...</p>
  {:else if error}
    <p>{error}</p>
  {:else if userSubmissions.length === 0}
    <p>ℹ️ No submissions found for your Google account.</p>
  {:else}
    {#each userSubmissions as idea}
      <div class="card">
        <h2>{idea.title}</h2>
        <p><strong>Category:</strong> {idea.category}</p>
        <p><strong>Description:</strong> {idea.description}</p>
        <p><strong>Gap Analysis:</strong> {idea.gapAnalysis}</p>
        <p><strong>Marketing Data:</strong> {idea.Marketingdata}</p>
        <p><strong>Existing Technologies:</strong> {idea.existingTechnologies}</p>
        <p><strong>Research Data:</strong> {idea.researchData}</p>
        <p><strong>Experimental Data:</strong> {idea.experimentalData}</p>
        {#if idea.visualizedProduct}
          <img class="image-preview" src={idea.visualizedProduct} alt="Visual" />
        {/if}
        <p><strong>Submitted on:</strong> {new Date(idea.submittedAt).toLocaleString()}</p>
      </div>
    {/each}
  {/if}
</div>
