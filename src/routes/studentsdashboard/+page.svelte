<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let loading = false;
  let error = '';
  let submissions = [];

  let form = {
    idea_title: '',
    category: '',
    idea_description: '',
    uniqueness: '',
    existingTechnologies: '',
    gapAnalysis: '',
    patentability: '',
    Marketingdata: '',
    visualizedProduct: '',
    researchData: '',
    experimentalData: '',
    otherCategory: '',
    confirmSubmission: false
  };

  let showOtherCategory = false;
  $: showOtherCategory = form.category === 'OTHERS';

  let showPatentField = false;
  $: showPatentField = form.uniqueness === 'Yes';

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) goto('/');
    user = session.user;
    await fetchSubmissions();
  });

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from('design_ideas')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) submissions = data;
  }

  async function submitForm() {
    if (!form.confirmSubmission) {
      alert("✅ Please confirm the submission.");
      return;
    }

    loading = true;
    error = '';

    const payload = {
      idea_title: form.idea_title,
      idea_desciption: form.idea_description,
      category: form.category,
      uniqueness: form.uniqueness,
      existing_technologies: form.existingTechnologies,
      gap_analysis: form.gapAnalysis,
      patentability: form.patentability,
      marketing_data: form.Marketingdata,
      visualized_product: form.visualizedProduct,
      research_data: form.researchData,
      experimental_data: form.experimentalData,
      other_category: form.otherCategory,
      confirm_submission: form.confirmSubmission,
      name: user.user_metadata.full_name || '',
      email: user.email,
      user_id: user.id
    };

    const { error: insertError } = await supabase
      .from('design_ideas')
      .insert([payload]);

    if (insertError) {
      error = '❌ Submission failed';
      console.error(insertError);
    } else {
      alert('✅ Submission successful!');
      resetForm();
      await fetchSubmissions();
    }

    loading = false;
  }

  function resetForm() {
    form = {
      idea_title: '',
      category: '',
      idea_description: '',
      uniqueness: '',
      existingTechnologies: '',
      gapAnalysis: '',
      patentability: '',
      Marketingdata: '',
      visualizedProduct: '',
      researchData: '',
      experimentalData: '',
      otherCategory: '',
      confirmSubmission: false
    };
  }

  async function logout() {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<div class="p-6 max-w-4xl mx-auto">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-blue-700">🚀 Submit Your Design Idea</h1>
    <button class="bg-red-500 text-white px-4 py-1 rounded" on:click={logout}>Logout</button>
  </div>

  <form on:submit|preventDefault={submitForm} class="space-y-4">
    <input bind:value={form.idea_title} placeholder="Idea Title" class="w-full p-3 border rounded" maxlength="100" />

    <select bind:value={form.category} class="w-full p-3 border rounded">
      <option value="">Select Category</option>
      <option value="CSE">Computer Science and Engineering</option>
      <option value="AIML">Mechanical Engineering</option>
      <option value="EEE">Electrical Engineering</option>
      <option value="MECH">Chemical Engineering</option>
      <option value="OTHERS">Others</option>
    </select>

    {#if showOtherCategory}
      <input bind:value={form.otherCategory} placeholder="Other Category" class="w-full p-3 border rounded" />
    {/if}

    <textarea bind:value={form.idea_description} placeholder="Idea Description" class="w-full p-3 border rounded" maxlength="500" />

    <select bind:value={form.uniqueness} class="w-full p-3 border rounded">
      <option value="">Is there any uniqueness?</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>

    {#if showPatentField}
      <input bind:value={form.patentability} placeholder="Patentability Information" class="w-full p-3 border rounded" />
    {/if}

    <input bind:value={form.existingTechnologies} placeholder="Existing Technologies" class="w-full p-3 border rounded" />
    <input bind:value={form.gapAnalysis} placeholder="Gap Analysis" class="w-full p-3 border rounded" />
    <input bind:value={form.Marketingdata} placeholder="Marketing Data" class="w-full p-3 border rounded" />
    <input bind:value={form.researchData} placeholder="Research Data" class="w-full p-3 border rounded" />
    <input bind:value={form.experimentalData} placeholder="Experimental Data" class="w-full p-3 border rounded" />
    <input bind:value={form.visualizedProduct} placeholder="Visualized Product URL or Notes" class="w-full p-3 border rounded" />

    <label class="flex items-center">
      <input type="checkbox" bind:checked={form.confirmSubmission} class="mr-2" />
      I confirm the submission.
    </label>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>

    {#if error}
      <p class="text-red-500 mt-2">{error}</p>
    {/if}
  </form>

  <hr class="my-8" />

  <h2 class="text-xl font-bold mb-4">📄 Your Submissions</h2>
  {#if submissions.length === 0}
    <p>No submissions yet.</p>
  {:else}
    <ul class="space-y-4">
      {#each submissions as s}
        <li class="bg-white shadow p-4 rounded">
          <h3 class="font-semibold text-blue-700">{s.idea_title}</h3>
          <p>{s.idea_desciption}</p>
          <p class="text-sm text-gray-500 mt-1">Submitted: {new Date(s.created_at).toLocaleString()}</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>
