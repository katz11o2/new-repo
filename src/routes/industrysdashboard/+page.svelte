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
    category: '',
    title: '',
    description: '',
    uniqueness: '',
    existingTech: '',
    gapAnalysis: '',
    patentability: '',
    marketData: '',
    financials: '',
    visualized_product: '',
    confirm_submission: false
  };

  onMount(async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      goto('/');
      return;
    }
    user = session.user;
    await fetchSubmissions();
  });

  async function fetchSubmissions() {
  const { data, error } = await supabase
    .from('design_ideas') // ✅ Correct table
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!error) {
    submissions = data;
  } else {
    console.error('Failed to fetch submissions:', error.message);
  }
}


 async function submitForm() {
  if (!form.category || !form.title) {
    alert('Please fill in the Category and Title.');
    return;
  }
  if (!form.confirm_submission) {
    alert('Please confirm the submission.');
    return;
  }

  loading = true;
  error = '';

  const payload = {
    ...form,
    name: user.user_metadata?.full_name || user.email,
    email: user.email,
    user_id: user.id,
    created_at: new Date().toISOString() // Add if `created_at` is required
  };

  console.log('🚀 Submitting payload:', payload); // ✅ Debug log

  try {
    const { data, error: insertError } = await supabase
      .from('design_ideas') // ✅ Changed table name
      .insert([payload]);

    if (insertError) {
      console.error('❌ Supabase Insert Error:', insertError); // ✅ Detailed error log
      error = `Submission failed: ${insertError.message ?? 'Unknown error occurred.'}`;
    } else {
      alert('✅ Submission successful!');
      resetForm();
      await fetchSubmissions();
      activeSection = 'view';
    }
  } catch (err) {
    console.error('❗ Unexpected JS Error:', err);
    error = `Submission failed: ${err.message ?? 'Unexpected client-side error.'}`;
  }

  loading = false;
}


  function resetForm() {
    form = {
      category: '',
      title: '',
      description: '',
      uniqueness: '',
      existingTech: '',
      gapAnalysis: '',
      patentability: '',
      marketData: '',
      financials: '',
      visualized_product: '',
      confirm_submission: false
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
    color: #1e3a8a;
    font-weight: 600;
  }

  .sidebar button:hover {
    background: rgba(255, 255, 255, 0.2);
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
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    padding: 2rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.9rem;
    margin-bottom: 1.25rem;
    border: 1.5px solid #cbd5e1;
    border-radius: 1rem;
    font-size: 1rem;
    background-color: #f8fafc;
    transition: border 0.2s ease;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: #1e3a8a;
    outline: none;
    background-color: white;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button.submit-btn {
    background-color: #1e3a8a;
    color: white;
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease;
    font-weight: 600;
    font-size: 1rem;
  }

  button.submit-btn:hover {
    background-color: #294faa;
  }

  label {
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
    color: #334155;
  }

  .submission-card {
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  h2 {
    margin-bottom: 1.5rem;
    color: #1e3a8a;
  }

  h3 {
    margin-top: 0;
    color: #1e293b;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
</style>

<div class="layout">
  <div class="sidebar">
    <button on:click={() => activeSection = 'submit'}>Submit Challenge</button>
    <button on:click={() => activeSection = 'view'}>View Submissions</button>
    <button on:click={signOut}>Logout</button>
  </div>

  <div class="main-content">
    <main>
      <div class="glass">
        {#if activeSection === 'submit'}
          <h2>Submit a Challenge</h2>

          <select bind:value={form.category}>
            <option value="">Select Category</option>
            <option value="New Product Development">New Product Development</option>
            <option value="New Process Development">New Process Development</option>
            <option value="New Features in Existing Product">New Features in Existing Product</option>
            <option value="Problems in Existing Product">Problems in Existing Product</option>
            <option value="Problems in Existing Processes">Problems in Existing Processes</option>
          </select>

          <input bind:value={form.title} placeholder="Enter a descriptive title" />
          <textarea bind:value={form.description} placeholder="Explain the problem in detail"></textarea>
          <input bind:value={form.uniqueness} placeholder="What makes it unique?" />
          <input bind:value={form.existingTech} placeholder="What exists already?" />
          <input bind:value={form.gapAnalysis} placeholder="What's missing in current process?" />
          <input bind:value={form.patentability} placeholder="Is it patentable?" />
          <input bind:value={form.marketData} placeholder="Any marketing data?" />
          <input bind:value={form.financials} placeholder="Any cost estimates or funding info" />
          <input bind:value={form.visualized_product} placeholder="Product Visual (URL or Notes)" />

          <label><input type="checkbox" bind:checked={form.confirm_submission} /> I confirm the submission.</label>

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
                <h3>{sub.title}</h3>
                <p><strong>Category:</strong> {sub.category}</p>
                <p><strong>Description:</strong> {sub.description}</p>
                <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
                <p><strong>Existing Technologies:</strong> {sub.existingTech}</p>
                <p><strong>Gap Analysis:</strong> {sub.gapAnalysis}</p>
                <p><strong>Patentability:</strong> {sub.patentability}</p>
                <p><strong>Market Data:</strong> {sub.marketData}</p>
                <p><strong>Financials:</strong> {sub.financials}</p>
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
