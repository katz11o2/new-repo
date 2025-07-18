<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let studentEntries = [];
  let industryEntries = [];
  let error = '';
  let loading = false;

  async function fetchEntries() {
    loading = true;

    // Fetch student entries with all expected fields
    const { data: studentData, error: studentError } = await supabase
      .from('design_ideas')
      .select(`idea_title, category, idea_description, uniqueness, existingTechnologies, gapAnalysis, patentability, marketing_data, visualized_product, research_data, experimental_data, other_category, confirm_submission, name, email, created_at`)
      .order('created_at', { ascending: false });

    if (studentError) {
      error = 'Error fetching student submissions.';
      console.error(studentError);
    } else {
      studentEntries = studentData;
    }

    // Fetch industry entries with all expected fields
    const { data: industryData, error: industryError } = await supabase
      .from('industry_ideas')
      .select(`category, title, description, uniqueness, existingTech, gapAnalysis, patentability, marketData, financials, visualized_product, confirm_submission, name, email, created_at`)
      .order('created_at', { ascending: false });

    if (industryError) {
      error = 'Error fetching industry submissions.';
      console.error(industryError);
    } else {
      industryEntries = industryData;
    }

    loading = false;
  }

  onMount(async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      goto('/');
      return;
    }

    user = session.user;
    await fetchEntries();
  });
</script>

<style>
  .section {
    margin: 2rem 0;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 1rem;
    padding: 1.5rem;
    margin: 1rem auto;
    max-width: 700px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  h2 {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.8rem;
    color: #2c3e50;
  }

  .loading {
    text-align: center;
    margin-top: 3rem;
    font-size: 1.25rem;
  }

  .card p {
    margin: 0.3rem 0;
  }

  .field-title {
    font-weight: bold;
  }
</style>

{#if loading}
  <div class="loading">Loading submissions...</div>
{:else}
  <div class="section">
    <h2>🎓 Student Submissions</h2>
    {#if studentEntries.length === 0}
      <p style="text-align:center;">No student submissions found.</p>
    {:else}
      {#each studentEntries as sub}
        <div class="card">
          <h3>{sub.idea_title}</h3>
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
  </div>

  <div class="section">
    <h2>🏭 Industry Submissions</h2>
    {#if industryEntries.length === 0}
      <p style="text-align:center;">No industry submissions found.</p>
    {:else}
      {#each industryEntries as sub}
        <div class="card">
          <h3>{sub.title}</h3>
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
  </div>
{/if}
