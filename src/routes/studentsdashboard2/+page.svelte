<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let submissions = [];
  let userEmail = '';
  let loading = true;

  onMount(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    userEmail = user?.email;

    if (!userEmail) {
      alert('Not signed in');
      loading = false;
      return;
    }

    const { data, error } = await supabase
      .from('designsubmissions')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      alert('Error fetching submissions');
    } else {
      submissions = data;
    }
    loading = false;
  });
</script>

<style>
  .card {
    @apply bg-white p-4 shadow-md rounded-xl mb-4 border border-gray-200;
  }
  .title {
    @apply text-lg font-semibold mb-2;
  }
  .field {
    @apply text-sm text-gray-700 mb-1;
  }
</style>

{#if loading}
  <div class="text-center p-6">Loading your submissions...</div>
{:else if submissions.length === 0}
  <div class="text-center p-6 text-gray-600">No submissions found.</div>
{:else}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
    {#each submissions as sub}
      <div class="card">
        <div class="title">{sub.title}</div>
        <div class="field"><strong>Category:</strong> {sub.category}</div>
        <div class="field"><strong>Description:</strong> {sub.description}</div>
        <div class="field"><strong>Uniqueness:</strong> {sub.uniqueness}</div>
        <div class="field"><strong>Technologies:</strong> {sub.existingTechnologies}</div>
        <div class="field"><strong>Gap Analysis:</strong> {sub.gapAnalysis}</div>
        <div class="field"><strong>Patentability:</strong> {sub.patentability}</div>
        <div class="field"><strong>Marketing Data:</strong> {sub.Marketingdata}</div>
        <div class="field"><strong>Visualized Product:</strong> {sub.visualizedProduct}</div>
        <div class="field"><strong>Research Data:</strong> {sub.researchData}</div>
        <div class="field"><strong>Experimental Data:</strong> {sub.experimentalData}</div>
        <div class="field"><strong>Submitted:</strong> {new Date(sub.created_at).toLocaleString()}</div>
        {#if sub.imageUrl}
          <img src={sub.imageUrl} alt="Design" class="mt-2 rounded-md max-h-48 object-cover border border-gray-300" />
        {/if}
      </div>
    {/each}
  </div>
{/if}
