<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let studentEntries = [];
  let industryEntries = [];
  let allEntries = [];
  let activeTab = 'students';

  // Fetch data from Supabase
  async function fetchEntries() {
    const { data, error } = await supabase
      .from('design_ideas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
      return;
    }

    allEntries = data;
    studentEntries = data.filter((entry) => entry.type === 'student');
    industryEntries = data.filter((entry) => entry.type === 'industry');
  }

  onMount(async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(sessionError);
      goto('/');
      return;
    }

    if (!session || !session.user) {
      console.warn("No active session, redirecting...");
      goto('/');
      return;
    }

    user = session.user;
    await fetchEntries();
  });
</script>

<style>
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .tab {
    padding: 0.5rem 1rem;
    background-color: #eee;
    border-radius: 5px;
    cursor: pointer;
  }

  .active-tab {
    background-color: #ccc;
    font-weight: bold;
  }

  .card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
  }
</style>

<h1 class="text-2xl font-bold mb-4">All Submissions</h1>

<div class="tabs">
  <div class="tab {activeTab === 'students' ? 'active-tab' : ''}" on:click={() => activeTab = 'students'}>Students</div>
  <div class="tab {activeTab === 'industry' ? 'active-tab' : ''}" on:click={() => activeTab = 'industry'}>Industry</div>
  <div class="tab {activeTab === 'all' ? 'active-tab' : ''}" on:click={() => activeTab = 'all'}>All</div>
</div>

{#if activeTab === 'students'}
  {#each studentEntries as sub}
    <div class="card">
      <h3>{sub.idea_title || sub.title}</h3>
      <p><strong>Category:</strong> {sub.category}</p>
      {#if sub.other_category}<p><strong>Other Category:</strong> {sub.other_category}</p>{/if}
      <p><strong>Description:</strong> {sub.idea_description || sub.description}</p>
      <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
      <p><strong>Gap Analysis:</strong> {sub.gapAnalysis}</p>
      <p><strong>Existing Tech:</strong> {sub.existingTechnologies || sub.existingTech}</p>
      <p><strong>Marketing:</strong> {sub.marketing_data || sub.marketData}</p>
      <p><strong>Research:</strong> {sub.research_data}</p>
      <p><strong>Experimental:</strong> {sub.experimental_data}</p>
      <p><strong>Financials:</strong> {sub.financials}</p>
      <p><strong>Patentability:</strong> {sub.patentability}</p>
      <p><strong>Visual Product:</strong> {sub.visualized_product}</p>
      <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
      <p><strong>Submitted at:</strong> {new Date(sub.created_at).toLocaleString()}</p>
    </div>
  {/each}
{/if}

{#if activeTab === 'industry'}
  {#each industryEntries as sub}
    <div class="card">
      <h3>{sub.idea_title || sub.title}</h3>
      <p><strong>Category:</strong> {sub.category}</p>
      {#if sub.other_category}<p><strong>Other Category:</strong> {sub.other_category}</p>{/if}
      <p><strong>Description:</strong> {sub.idea_description || sub.description}</p>
      <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
      <p><strong>Gap Analysis:</strong> {sub.gapAnalysis}</p>
      <p><strong>Existing Tech:</strong> {sub.existingTechnologies || sub.existingTech}</p>
      <p><strong>Marketing:</strong> {sub.marketing_data || sub.marketData}</p>
      <p><strong>Research:</strong> {sub.research_data}</p>
      <p><strong>Experimental:</strong> {sub.experimental_data}</p>
      <p><strong>Financials:</strong> {sub.financials}</p>
      <p><strong>Patentability:</strong> {sub.patentability}</p>
      <p><strong>Visual Product:</strong> {sub.visualized_product}</p>
      <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
      <p><strong>Submitted at:</strong> {new Date(sub.created_at).toLocaleString()}</p>
    </div>
  {/each}
{/if}

{#if activeTab === 'all'}
  {#each allEntries as sub}
    <div class="card">
      <h3>{sub.idea_title || sub.title}</h3>
      <p><strong>Category:</strong> {sub.category}</p>
      {#if sub.other_category}<p><strong>Other Category:</strong> {sub.other_category}</p>{/if}
      <p><strong>Description:</strong> {sub.idea_description || sub.description}</p>
      <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
      <p><strong>Gap Analysis:</strong> {sub.gapAnalysis}</p>
      <p><strong>Existing Tech:</strong> {sub.existingTechnologies || sub.existingTech}</p>
      <p><strong>Marketing:</strong> {sub.marketing_data || sub.marketData}</p>
      <p><strong>Research:</strong> {sub.research_data}</p>
      <p><strong>Experimental:</strong> {sub.experimental_data}</p>
      <p><strong>Financials:</strong> {sub.financials}</p>
      <p><strong>Patentability:</strong> {sub.patentability}</p>
      <p><strong>Visual Product:</strong> {sub.visualized_product}</p>
      <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
      <p><strong>Submitted at:</strong> {new Date(sub.created_at).toLocaleString()}</p>
    </div>
  {/each}
{/if}
