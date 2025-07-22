<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let activeSection = 'submit';
  let submissions = [];
  let error = '';
  let loading = false;

  let form = {
    idea_title: '',
    category: '',
    idea_description: '',
    uniqueness: '',
    existingTechnologies: '',
    gapAnalysis: '',
    patentability: '',
    marketing_data: '',
    visualized_product: '',
    research_data: '',
    experimental_data: '',
    other_category: '',
    confirm_submission: false
  };

  let showOtherCategory = false;
  $: showOtherCategory = form.category === 'OTHERS';

  let showPatentField = false;
  $: showPatentField = form.uniqueness === 'Yes';

onMount(async () => {
  let email = sessionStorage.getItem("userEmail");

  // fallback to Supabase Auth (for Google login)
  if (!email) {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session && session.user?.email) {
      email = session.user.email;
      sessionStorage.setItem("userEmail", email);
    } else {
      // not logged in — allow access anyway
      console.log("User not authenticated, continuing as guest.");
    }
  }

  if (email) {
    user = { email };
    console.log('Logged in as:', email);
    await fetchSubmissions();
  } else {
    console.log("No user email found. Skipping fetchSubmissions.");
  }
});



  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from('design_ideas')
      .select('*')
      .eq('email', user.email)

      .order('created_at', { ascending: false });

    if (!error) {
      submissions = data;
    } else {
      console.error('Failed to fetch submissions:', error.message);
    }
  }

  async function submitForm() {
    if (!form.confirmSubmission) {
      alert("Please confirm the submission.");
      return;
    }

    loading = true;
    error = ''; 

  const payload = {
  idea_title: form.idea_title || null,
  idea_description: form.idea_description || null, // ✅ FIXED spelling
  category: form.category || null,
  uniqueness: form.uniqueness || null,
 existingTechnologies: form.existingTechnologies || null,
gapAnalysis: form.gapAnalysis || null,

  patentability: form.patentability || null,
  marketing_data: form.marketing_data || null, // ✅ FIXED casing
  visualized_product: form.visualized_product || null, // ✅ FIXED casing
  research_data: form.research_data || null, // ✅ FIXED casing
  experimental_data: form.experimental_data || null, // ✅ FIXED casing
  other_category: form.other_category || null, // ✅ FIXED casing
  confirm_submission: form.confirm_submission || false, // ✅ FIXED casing
  name: user.email,

  user_type: 'student'
};


    try {
      const { error: insertError } = await supabase.from('design_ideas').insert([payload]);

      if (insertError) {
        error = `Submission failed: ${insertError.message}`;
      } else {
        alert('Submission successful!');
        resetForm();
        await fetchSubmissions();
        activeSection = 'view';
      }
    } catch (err) {
      error = `Unexpected error: ${err.message}`;
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
  marketing_data: '', // ✅ FIXED casing
  visualized_product: '', // ✅ FIXED casing
  research_data: '', // ✅ FIXED casing
  experimental_data: '', // ✅ FIXED casing
  other_category: '', // ✅ FIXED casing
  confirm_submission: false // ✅ FIXED casing
};

  }

  async function signOut() {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .layout {
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    background: linear-gradient(to bottom, #ffffffaa, #ffffff22);
    backdrop-filter: blur(16px);
    width: 240px;
    height: 100vh;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  }

  .sidebar button {
    background: none;
    border: none;
    text-align: left;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.8rem 1rem;
    border-radius: 0.75rem;
    transition: background 0.3s ease;
  }

  .sidebar button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(to right, #f0f4ff, #e8f0ff);
    overflow-y: auto;
  }

  main {
    padding: 2rem;
    flex: 1;
  }

  .glass {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(14px);
    border-radius: 1.5rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    padding: 2rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.9rem;
    margin-bottom: 1.25rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    font-size: 1rem;
  }

  button.submit-btn {
    background-color: #4f46e5;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button.submit-btn:hover {
    background-color: #4338ca;
  }

  .submission-card {
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
</style>

<div class="layout">
  <div class="sidebar">
    <button on:click={() => activeSection = 'submit'}>Submit Idea</button>
    <button on:click={() => activeSection = 'view'}>View Submissions</button>
    <button on:click={signOut}>Logout</button>
  </div>

  <div class="main-content">
    <main>
      <div class="glass">
        {#if activeSection === 'submit'}
          <h2>Submit Your Idea</h2>
          <input type="text" bind:value={form.idea_title} placeholder="Idea Title" maxlength="100" />

          <select bind:value={form.category}>
            <option value="">Select Category</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="AIML">Mechanical Engineering</option>
            <option value="EEE">Electrical Engineering</option>
            <option value="MECH">Chemical Engineering</option>
            <option value="OTHERS">Others</option>
          </select>

          {#if showOtherCategory}
            <input bind:value={form.other_category} placeholder="Other Category" />
          {/if}

          <textarea bind:value={form.idea_description} placeholder="Idea Description" rows="4" maxlength="500"></textarea>

          <select bind:value={form.uniqueness}>
            <option value="">Is there any uniqueness?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {#if showPatentField}
            <input bind:value={form.patentability} placeholder="Patentability Information" />
          {/if}

          <input bind:value={form.existingTechnologies} placeholder="Existing Technologies" />
          <input bind:value={form.gapAnalysis} placeholder="Gap Analysis" />
          <input bind:value={form.marketing_data} placeholder="Marketing Data" />
          <input bind:value={form.research_data} placeholder="Research Data" />
          <input bind:value={form.experimental_data} placeholder="Experimental Data" />
          <input bind:value={form.visualized_product} placeholder="Visualized Product (URL or Notes)" />

          <label class="flex items-center mb-4">
            <input type="checkbox" bind:checked={form.confirmSubmission} class="mr-2" />
            I confirm the submission.
          </label>

          <button class="submit-btn" on:click={submitForm} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {#if error}
            <p style="color:red">{error}</p>
          {/if}
        {/if}

        {#if activeSection === 'view'}
  <h2>Your Submissions</h2>
  {#if submissions.length === 0}
    <p>No submissions yet.</p>
  {:else}
    {#each submissions as sub}
      <div class="submission-card">
        <h3>{sub.idea_title}</h3>
        <p><strong>Category:</strong> {sub.category}</p>
        {#if sub.other_category}<p><strong>Other Category:</strong> {sub.other_category}</p>{/if}
        <p><strong>Description:</strong> {sub.idea_description}</p>
        <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
        {#if sub.patentability}<p><strong>Patentability:</strong> {sub.patentability}</p>{/if}
        <p><strong>Existing Technologies:</strong> {sub.existingTechnologies}</p>
        <p><strong>Gap Analysis:</strong> {sub.gapAnalysis}</p>
        <p><strong>Marketing Data:</strong> {sub.marketing_data}</p>
        <p><strong>Research Data:</strong> {sub.research_data}</p>
        <p><strong>Experimental Data:</strong> {sub.experimental_data}</p>
        <p><strong>Visualized Product:</strong> {sub.visualized_product}</p>
        <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
        <p><strong>Submitted at:</strong> {new Date(sub.created_at).toLocaleString()}</p>
      </div>
    {/each}
  {/if}
{/if}

      </div>
    </main>
  </div>
</div>
