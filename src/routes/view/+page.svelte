<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let allEntries = [];
  let activeTab = 'student';
  let loading = false;

  const studentCategories = ['CSE', 'AIML', 'EEE', 'MECH', 'OTHERS'];
  const industryCategories = [
    'New Product Development',
    'New Process Development',
    'New Features in Existing Product',
    'Problems in Existing Product',
    'Problems in Existing Processes'
  ];

  let studentEntries = [];
  let industryEntries = [];

  async function fetchAllEntries() {
    loading = true;

    // Fetch both tables
    const { data: studentData, error: studentError } = await supabase
      .from('design_ideas')
      .select('*');

    const { data: industryData, error: industryError } = await supabase
      .from('industry_ideas')
      .select('*');

    if (studentError || industryError) {
      console.error('Error fetching data', studentError, industryError);
      loading = false;
      return;
    }

    allEntries = [...studentData, ...industryData];

    // Separate based on category field
    studentEntries = allEntries.filter(e =>
      studentCategories.includes(e.category)
    );

    industryEntries = allEntries.filter(e =>
      industryCategories.includes(e.category)
    );

    loading = false;
  }

  onMount(async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) {
      goto('/');
      return;
    }
    user = session.user;
    await fetchAllEntries();
  });
</script>

<style>
  .tabs {
    display: flex;
    justify-content: center;
    margin: 2rem auto 1rem auto;
    gap: 1rem;
  }

  .tab-button {
    padding: 0.7rem 1.5rem;
    border-radius: 999px;
    border: none;
    background-color: #e0e0e0;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
  }

  .tab-button.active {
    background-color: #0077ff;
    color: white;
  }

  .cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
    max-width: 800px;
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .card h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  .card p {
    margin: 0.4rem 0;
    font-size: 0.95rem;
  }

  .field-title {
    font-weight: bold;
  }

  .loading {
    text-align: center;
    margin: 3rem;
    font-size: 1.2rem;
    color: #555;
  }
</style>

{#if loading}
  <div class="loading">Loading all submissions...</div>
{:else}
  <div>
    <div class="tabs">
      <button
        class="tab-button {activeTab === 'student' ? 'active' : ''}"
        on:click={() => (activeTab = 'student')}
      >
        🎓 Student Submissions
      </button>
      <button
        class="tab-button {activeTab === 'industry' ? 'active' : ''}"
        on:click={() => (activeTab = 'industry')}
      >
        🏭 Industry Submissions
      </button>
    </div>

    <div class="cards">
      {#if activeTab === 'student'}
        {#if studentEntries.length === 0}
          <p style="text-align:center;">No student submissions found.</p>
        {:else}
          {#each studentEntries as sub}
            <div class="card">
              <h3>{sub.idea_title || sub.title}</h3>
              <p><span class="field-title">Category:</span> {sub.category}</p>
              <p><span class="field-title">Other Category:</span> {sub.other_category}</p>
              <p><span class="field-title">Description:</span> {sub.idea_description}</p>
              <p><span class="field-title">Uniqueness:</span> {sub.uniqueness}</p>
              <p><span class="field-title">Existing Technologies:</span> {sub.existingTechnologies}</p>
              <p><span class="field-title">Gap Analysis:</span> {sub.gapAnalysis}</p>
              <p><span class="field-title">Patentability:</span> {sub.patentability}</p>
              <p><span class="field-title">Marketing Data:</span> {sub.marketing_data}</p>
              <p><span class="field-title">Research Data:</span> {sub.research_data}</p>
              <p><span class="field-title">Experimental Data:</span> {sub.experimental_data}</p>
              <p><span class="field-title">Visualized Product:</span> {sub.visualized_product}</p>
              <p><span class="field-title">Confirm Submission:</span> {sub.confirm_submission ? '✅ Yes' : '❌ No'}</p>
              <p><span class="field-title">Submitted by:</span> {sub.name} ({sub.email})</p>
              <p><span class="field-title">Submitted at:</span> {new Date(sub.created_at).toLocaleString()}</p>
            </div>
          {/each}
        {/if}
      {:else if activeTab === 'industry'}
        {#if industryEntries.length === 0}
          <p style="text-align:center;">No industry submissions found.</p>
        {:else}
          {#each industryEntries as sub}
            <div class="card">
              <h3>{sub.title || sub.idea_title}</h3>
              <p><span class="field-title">Category:</span> {sub.category}</p>
              <p><span class="field-title">Description:</span> {sub.description}</p>
              <p><span class="field-title">Uniqueness:</span> {sub.uniqueness}</p>
              <p><span class="field-title">Existing Technologies:</span> {sub.existingTech}</p>
              <p><span class="field-title">Gap Analysis:</span> {sub.gapAnalysis}</p>
              <p><span class="field-title">Patentability:</span> {sub.patentability}</p>
              <p><span class="field-title">Market Data:</span> {sub.marketData}</p>
              <p><span class="field-title">Financials:</span> {sub.financials}</p>
              <p><span class="field-title">Visualized Product:</span> {sub.visualized_product}</p>
              <p><span class="field-title">Confirm Submission:</span> {sub.confirm_submission ? '✅ Yes' : '❌ No'}</p>
              <p><span class="field-title">Submitted by:</span> {sub.name} ({sub.email})</p>
              <p><span class="field-title">Submitted at:</span> {new Date(sub.created_at).toLocaleString()}</p>
            </div>
          {/each}
        {/if}
      {/if}
    </div>
  </div>
{/if}
