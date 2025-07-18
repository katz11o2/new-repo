<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let allEntries = [];
  let studentEntries = [];
  let industryEntries = [];
  let activeType = 'student';

  const industryCategories = [
    'New Product Development',
    'New Process Development',
    'New Features in Existing Product',
    'Problems in Existing Product',
    'Problems in Existing Processes'
  ];

  const fetchEntries = async () => {
    const { data, error } = await supabase.from('design_ideas').select('*');
    if (!error && data) {
      allEntries = data;
      studentEntries = data.filter(
        (entry) => !industryCategories.includes(entry.category)
      );
      industryEntries = data.filter((entry) => industryCategories.includes(entry.category));
    } else {
      console.error(error);
    }
  };

  onMount(fetchEntries);
</script>

<style>
  .toggle-btn {
    @apply bg-gray-100 text-black px-4 py-2 rounded-xl m-2 shadow-md cursor-pointer hover:bg-gray-300 transition;
  }
  .active-btn {
    @apply bg-blue-600 text-white;
  }
  .card {
    @apply bg-white shadow-md rounded-2xl p-6 mb-6 w-full max-w-3xl mx-auto backdrop-blur-md bg-opacity-30;
  }
  .field {
    @apply mb-2;
  }
  .label {
    @apply font-semibold;
  }
  .value {
    @apply text-gray-700;
  }
</style>

<div class="flex justify-center my-6">
  <button
    class="toggle-btn {activeType === 'student' ? 'active-btn' : ''}"
    on:click={() => (activeType = 'student')}
  >
    Student Entries
  </button>
  <button
    class="toggle-btn {activeType === 'industry' ? 'active-btn' : ''}"
    on:click={() => (activeType = 'industry')}
  >
    Industry Entries
  </button>
</div>

{#if activeType === 'student'}
  {#each studentEntries as entry}
    <div class="card">
      <div class="field"><span class="label">Title:</span> <span class="value">{entry.idea_title}</span></div>
      <div class="field"><span class="label">Category:</span> <span class="value">{entry.category}</span></div>
      <div class="field"><span class="label">Idea Description:</span> <span class="value">{entry.idea_description}</span></div>
      <div class="field"><span class="label">Uniqueness:</span> <span class="value">{entry.uniqueness}</span></div>
      <div class="field"><span class="label">Existing Technologies:</span> <span class="value">{entry.existingTechnologies}</span></div>
      <div class="field"><span class="label">Gap Analysis:</span> <span class="value">{entry.gapAnalysis}</span></div>
      <div class="field"><span class="label">Patentability:</span> <span class="value">{entry.patentability}</span></div>
      <div class="field"><span class="label">Marketing Data:</span> <span class="value">{entry.marketing_data}</span></div>
      <div class="field"><span class="label">Visualized Product:</span> <span class="value">{entry.visualized_product}</span></div>
      <div class="field"><span class="label">Research Data:</span> <span class="value">{entry.research_data}</span></div>
      <div class="field"><span class="label">Experimental Data:</span> <span class="value">{entry.experimental_data}</span></div>
      <div class="field"><span class="label">Other Category:</span> <span class="value">{entry.other_category}</span></div>
      <div class="field"><span class="label">Submitted:</span> <span class="value">{entry.confirm_submission ? 'Yes' : 'No'}</span></div>
    </div>
  {/each}
{:else}
  {#each industryEntries as entry}
    <div class="card">
      <div class="field"><span class="label">Title:</span> <span class="value">{entry.title}</span></div>
      <div class="field"><span class="label">Category:</span> <span class="value">{entry.category}</span></div>
      <div class="field"><span class="label">Description:</span> <span class="value">{entry.description}</span></div>
      <div class="field"><span class="label">Uniqueness:</span> <span class="value">{entry.uniqueness}</span></div>
      <div class="field"><span class="label">Existing Tech:</span> <span class="value">{entry.existingTech}</span></div>
      <div class="field"><span class="label">Gap Analysis:</span> <span class="value">{entry.gapAnalysis}</span></div>
      <div class="field"><span class="label">Patentability:</span> <span class="value">{entry.patentability}</span></div>
      <div class="field"><span class="label">Market Data:</span> <span class="value">{entry.marketData}</span></div>
      <div class="field"><span class="label">Financials:</span> <span class="value">{entry.financials}</span></div>
      <div class="field"><span class="label">Visualized Product:</span> <span class="value">{entry.visualized_product}</span></div>
      <div class="field"><span class="label">Submitted:</span> <span class="value">{entry.confirm_submission ? 'Yes' : 'No'}</span></div>
    </div>
  {/each}
{/if}
