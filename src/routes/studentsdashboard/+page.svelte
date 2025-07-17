<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let submissions = [];
  let error = '';
  let loading = false;
  let activeTab = 'submit';

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

    if (!error) {
      submissions = data;
    } else {
      console.error('❌ Failed to fetch submissions:', error.message);
    }
  }

  async function submitForm() {
    if (!form.confirmSubmission) {
      alert("✅ Please confirm the submission.");
      return;
    }

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

      if (insertError) {
        error = `❌ Submission failed: ${insertError.message}`;
        console.error('Insert error:', insertError);
      } else {
        alert('✅ Submission successful!');
        resetForm();
        await fetchSubmissions();
      }
    } catch (err) {
      error = `❌ Unexpected error: ${err.message}`;
      console.error('Unexpected error:', err);
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
  .tab-button { @apply px-4 py-2 hover:bg-blue-200 rounded transition-colors; }
  .active-tab { @apply bg-blue-600 text-white; }
  .input { @apply border p-2 rounded w-full mb-4; }
  .btn { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700; }
</style>

<main class="max-w-5xl mx-auto p-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">👋 Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
    <button class="btn" on:click={signOut}>Logout</button>
  </div>

  <nav class="mb-6 flex gap-4 border-b pb-2">
    <button class="tab-button {activeTab === 'submit' ? 'active-tab' : ''}" on:click={() => activeTab = 'submit'}>Submit Project Idea</button>
    <button class="tab-button {activeTab === 'view' ? 'active-tab' : ''}" on:click={() => activeTab = 'view'}>See Your Submissions</button>
    <button class="tab-button {activeTab === 'status' ? 'active-tab' : ''}" on:click={() => activeTab = 'status'}>View Project Status</button>
    <button class="tab-button {activeTab === 'profile' ? 'active-tab' : ''}" on:click={() => activeTab = 'profile'}>Profile</button>
  </nav>

  {#if activeTab === 'submit'}
    <div class="bg-white shadow p-6 rounded">
      <h2 class="text-xl font-semibold mb-4">🚀 Submit Your Design Idea</h2>

      <input class="input" type="text" bind:value={form.idea_title} placeholder="Idea Title" maxlength="100" />

      <select class="input" bind:value={form.category}>
        <option value="">Select Category</option>
        <option value="CSE">Computer Science and Engineering</option>
        <option value="AIML">Mechanical Engineering</option>
        <option value="EEE">Electrical Engineering</option>
        <option value="MECH">Chemical Engineering</option>
        <option value="OTHERS">Others</option>
      </select>

      {#if showOtherCategory}
        <input class="input" bind:value={form.otherCategory} placeholder="Other Category" />
      {/if}

      <textarea class="input" bind:value={form.idea_description} placeholder="Idea Description" rows="4" maxlength="500"></textarea>

      <select class="input" bind:value={form.uniqueness}>
        <option value="">Is there any uniqueness?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {#if showPatentField}
        <input class="input" bind:value={form.patentability} placeholder="Patentability Information" />
      {/if}

      <input class="input" bind:value={form.existingTechnologies} placeholder="Existing Technologies" />
      <input class="input" bind:value={form.gapAnalysis} placeholder="Gap Analysis" />
      <input class="input" bind:value={form.Marketingdata} placeholder="Marketing Data" />
      <input class="input" bind:value={form.researchData} placeholder="Research Data" />
      <input class="input" bind:value={form.experimentalData} placeholder="Experimental Data" />
      <input class="input" bind:value={form.visualizedProduct} placeholder="Visualized Product (URL or Notes)" />

      <label class="flex items-center mb-4">
        <input type="checkbox" bind:checked={form.confirmSubmission} class="mr-2" />
        I confirm the submission.
      </label>

      <button class="btn" on:click={submitForm} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {#if error}
        <p class="text-red-600 mt-2">{error}</p>
      {/if}
    </div>
  {:else if activeTab === 'view'}
    <div class="bg-white shadow p-6 rounded">
      <h2 class="text-xl font-semibold mb-4">📄 Your Submissions</h2>
      {#if submissions.length === 0}
        <p>No submissions yet.</p>
      {:else}
        <ul>
          {#each submissions as sub}
            <li class="mb-4 border-b pb-2">
              <h3 class="font-bold">{sub.idea_title}</h3>
              <p>{sub.idea_desciption}</p>
              <small class="text-gray-500">Submitted on {new Date(sub.created_at).toLocaleString()}</small>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {:else if activeTab === 'status'}
    <div class="bg-white shadow p-6 rounded">
      <h2 class="text-xl font-semibold mb-4">📊 Project Status</h2>
      <p class="text-gray-600">🚧 Coming soon: A real-time status view of your submissions.</p>
    </div>
  {:else if activeTab === 'profile'}
    <div class="bg-white shadow p-6 rounded">
      <h2 class="text-xl font-semibold mb-4">👤 Profile</h2>
      <p><strong>Name:</strong> {user?.user_metadata?.full_name || 'N/A'}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>User ID:</strong> {user?.id}</p>
    </div>
  {/if}
</main>