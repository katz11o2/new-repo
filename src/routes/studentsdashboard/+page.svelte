<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let submissions = [];
  let error = '';
  let loading = false;
  let activeTab = 'submit';
  let isMenuOpen = false;

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
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('Session error:', sessionError?.message);
      goto('/');
      return;
    }
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
    else console.error('❌ Failed to fetch submissions:', error.message);
  }

  async function submitForm() {
    if (!form.confirmSubmission) return alert("✅ Please confirm the submission.");
    loading = true;
    error = '';

    const payload = {
      idea_title: form.idea_title || null,
      idea_desciption: form.idea_description || null,
      category: form.category || null,
      uniqueness: form.uniqueness || null,
      existing_technologies: form.existingTechnologies || null,
      gap_analysis: form.gapAnalysis || null,
      patentability: form.patentability || null,
      marketing_data: form.Marketingdata || null,
      visualized_product: form.visualizedProduct || null,
      research_data: form.researchData || null,
      experimental_data: form.experimentalData || null,
      other_category: form.otherCategory || null,
      confirm_submission: form.confirmSubmission || false,
      name: user.user_metadata?.full_name || user.email,
      email: user.email,
      user_id: user.id
    };

    try {
      const { error: insertError } = await supabase.from('design_ideas').insert([payload]);
      if (insertError) error = `❌ Submission failed: ${insertError.message}`;
      else {
        alert('✅ Submission successful!');
        resetForm();
        await fetchSubmissions();
      }
    } catch (err) {
      error = `❌ Unexpected error: ${err.message}`;
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

  async function signOut() {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<style>
  .input {
    @apply border border-gray-300 p-2 rounded w-full;
  }
  .btn {
    @apply bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded hover:from-blue-700 hover:to-indigo-700;
  }
  .hamburger {
    @apply fixed top-4 left-4 z-50 md:hidden text-3xl;
  }
  .sidebar {
    @apply fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-40 transform transition-transform duration-300;
  }
  .sidebar.hidden {
    transform: translateX(-100%);
  }
</style>

<div class="flex h-screen overflow-hidden">
  <button class="hamburger" on:click={() => isMenuOpen = !isMenuOpen}>
    &#9776;
  </button>

  <aside class={`sidebar ${isMenuOpen ? '' : 'hidden md:block'}`}>
    <h1 class="text-3xl font-bold mb-10 text-blue-600">Student Panel</h1>
    <nav class="flex flex-col gap-4">
      <button on:click={() => activeTab = 'profile'} class="btn">Profile</button>
      <button on:click={() => activeTab = 'submit'} class="btn">Submit Your Idea</button>
      <button on:click={() => activeTab = 'view'} class="btn">View Your Idea</button>
      <button on:click={signOut} class="btn bg-red-600 hover:bg-red-700">Logout</button>
    </nav>
  </aside>

  <main class="flex-1 overflow-y-auto p-8 bg-gray-50">
    {#if activeTab === 'profile'}
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user?.user_metadata?.full_name || 'N/A'}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    {/if}

    {#if activeTab === 'submit'}
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Submit Your Design Idea</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <input class="input" bind:value={form.idea_title} placeholder="Idea Title" />
          <select class="input" bind:value={form.category}>
            <option value="">Select Category</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AIML</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="OTHERS">Others</option>
          </select>
          {#if showOtherCategory}
            <input class="input col-span-2" bind:value={form.otherCategory} placeholder="Other Category" />
          {/if}
          <textarea class="input col-span-2" bind:value={form.idea_description} placeholder="Idea Description"></textarea>
          <select class="input" bind:value={form.uniqueness}>
            <option value="">Uniqueness?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {#if showPatentField}
            <input class="input" bind:value={form.patentability} placeholder="Patentability Info" />
          {/if}
          <input class="input" bind:value={form.existingTechnologies} placeholder="Existing Technologies" />
          <input class="input" bind:value={form.gapAnalysis} placeholder="Gap Analysis" />
          <input class="input" bind:value={form.Marketingdata} placeholder="Marketing Data" />
          <input class="input" bind:value={form.researchData} placeholder="Research Data" />
          <input class="input" bind:value={form.experimentalData} placeholder="Experimental Data" />
          <input class="input col-span-2" bind:value={form.visualizedProduct} placeholder="Visualized Product URL or Notes" />
          <label class="col-span-2 flex items-center">
            <input type="checkbox" bind:checked={form.confirmSubmission} class="mr-2" /> I confirm the submission
          </label>
          <button class="btn col-span-2" on:click={submitForm} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          {#if error}
            <p class="text-red-600 col-span-2">{error}</p>
          {/if}
        </div>
      </div>
    {/if}

    {#if activeTab === 'view'}
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Your Submissions</h2>
        {#if submissions.length === 0}
          <p>No submissions yet.</p>
        {:else}
          <ul class="space-y-4">
            {#each submissions as sub}
              <li class="p-4 bg-gray-50 rounded border shadow-sm">
                <h3 class="text-lg font-bold">{sub.idea_title}</h3>
                <p>{sub.idea_desciption}</p>
                <small class="text-gray-500">{new Date(sub.created_at).toLocaleString()}</small>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </main>
</div>
