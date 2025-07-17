<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let activeSection = 'dashboard'; // default section
  let file = null;
  let loading = false;
  let success = false;

  let form = {
    title: "",
    category: "",
    description: "",
    uniqueness: "",
    existingTechnologies: "",
    gapAnalysis: "",
    patentability: "",
    Marketingdata: "",
    visualizedProduct: "",
    researchData: "",
    experimentalData: "",
    otherCategory: "",
    confirmSubmission: false
  };

  $: showOtherCategory = form.category === "OTHERS";
  $: showPatentField = form.uniqueness === "Yes";

  async function submitForm() {
    if (!form.confirmSubmission || !file) {
      alert("Please upload a file and confirm submission.");
      return;
    }
    loading = true;
    try {
      const path = `uploads/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } =
        await supabase.storage.from('submissions-images').upload(path, file);
      if (uploadError) throw uploadError;

      const { publicUrl } = supabase.storage.from('submissions-images').getPublicUrl(uploadData.path);
      form.visualizedProduct = publicUrl;

      const { error: dbError } = await supabase.from('submissions').insert([
        { ...form, submitted_at: new Date().toISOString() }
      ]);
      if (dbError) throw dbError;

      success = true;
      form = {
        title: "",
        category: "",
        description: "",
        uniqueness: "",
        existingTechnologies: "",
        gapAnalysis: "",
        patentability: "",
        Marketingdata: "",
        visualizedProduct: "",
        researchData: "",
        experimentalData: "",
        otherCategory: "",
        confirmSubmission: false
      };
      file = null;
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed: " + err.message);
    } finally {
      loading = false;
    }
  }

  function logout() {
    supabase.auth.signOut();
    goto('/');
  }
</script>

<style>
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #f9f9f9;
  }

  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 240px;
    background-color: #ffffff;
    border-right: 1px solid #e5e5e5;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
  }

  .sidebar h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
  }

  .menu-item {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
    color: #333;
  }

  .menu-item:hover,
  .menu-item.active {
    background-color: #4a90e2;
    color: white;
  }

  .main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background: white;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  form {
    max-width: 800px;
    margin: 0 auto;
  }

  label {
    display: block;
    font-weight: bold;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #fafafa;
  }

  input[type="file"] {
    padding: 0.3rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.9rem 1.5rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
    width: 100%;
  }

  button:hover {
    background-color: #357abd;
  }

  .success {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 768px) {
    .layout {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      flex-direction: row;
      overflow-x: auto;
      border-right: none;
      border-bottom: 1px solid #e5e5e5;
    }

    .menu-item {
      flex: 1;
      text-align: center;
    }

    .main {
      padding: 1rem;
    }
  }
</style>

<div class="layout">
  <!-- Sidebar -->
  <div class="sidebar">
    <h2>📂 Dashboard</h2>
    <div class="menu-item {activeSection === 'dashboard' ? 'active' : ''}" on:click={() => activeSection = 'dashboard'}>
      Dashboard
    </div>
    <div class="menu-item {activeSection === 'submit' ? 'active' : ''}" on:click={() => activeSection = 'submit'}>
      Submit Your Design
    </div>
    <div class="menu-item {activeSection === 'view' ? 'active' : ''}" on:click={() => activeSection = 'view'}>
      View Submissions
    </div>
    <div class="menu-item" on:click={logout}>Logout</div>
  </div>

  <!-- Main Content -->
  <div class="main">
    {#if activeSection === 'dashboard'}
      <h1>Welcome to the Innovation Dashboard 👋</h1>
      <p>Select a menu item to get started.</p>

    {:else if activeSection === 'submit'}
      <h1>📝 Submit Your Design</h1>
      {#if success}
        <div class="success">🎉 Submitted successfully!</div>
      {/if}
      <form on:submit|preventDefault={submitForm}>
        <label>Title</label>
        <input bind:value={form.title} required />

        <label>Category</label>
        <select bind:value={form.category} required>
          <option value="">--Select--</option>
          <option value="SCIENCE">Science</<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let activeSection = 'dashboard';
  let file = null;
  let loading = false;
  let success = false;
  let submissions = [];

  let form = {
    title: "",
    category: "",
    description: "",
    uniqueness: "",
    existingTechnologies: "",
    gapAnalysis: "",
    patentability: "",
    Marketingdata: "",
    visualizedProduct: "",
    researchData: "",
    experimentalData: "",
    otherCategory: "",
    confirmSubmission: false
  };

  $: showOtherCategory = form.category === "OTHERS";
  $: showPatentField = form.uniqueness === "Yes";

  async function fetchSubmissions() {
    const { data, error } = await supabase.from('submissions').select('*').order('submitted_at', { ascending: false });
    if (!error) {
      submissions = data;
    } else {
      console.error("Error loading submissions:", error);
    }
  }

  async function submitForm() {
    if (!form.confirmSubmission || !file) {
      alert("Please upload a file and confirm submission.");
      return;
    }
    loading = true;
    try {
      const path = `uploads/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } =
        await supabase.storage.from('submissions-images').upload(path, file);
      if (uploadError) throw uploadError;

      const { publicUrl } = supabase.storage.from('submissions-images').getPublicUrl(uploadData.path);
      form.visualizedProduct = publicUrl;

      const { error: dbError } = await supabase.from('submissions').insert([
        { ...form, submitted_at: new Date().toISOString() }
      ]);
      if (dbError) throw dbError;

      success = true;
      form = {
        title: "",
        category: "",
        description: "",
        uniqueness: "",
        existingTechnologies: "",
        gapAnalysis: "",
        patentability: "",
        Marketingdata: "",
        visualizedProduct: "",
        researchData: "",
        experimentalData: "",
        otherCategory: "",
        confirmSubmission: false
      };
      file = null;
      fetchSubmissions();
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed: " + err.message);
    } finally {
      loading = false;
    }
  }

  function logout() {
    supabase.auth.signOut();
    goto('/');
  }

  onMount(() => {
    fetchSubmissions();
  });
</script>

<!-- Keep your existing style block and layout -->

<!-- ... existing HTML unchanged ... -->

<!-- Main Content Update for View Section -->
{:else if activeSection === 'view'}
  <h1>📄 View Your Submissions</h1>
  {#if submissions.length > 0}
    <div class="submissions-grid">
      {#each submissions as sub}
        <div class="submission-card">
          <h3>{sub.title}</h3>
          <p><strong>Category:</strong> {sub.category} {sub.otherCategory && `(${sub.otherCategory})`}</p>
          <p><strong>Description:</strong> {sub.description}</p>
          <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
          {#if sub.uniqueness === 'Yes'}
            <p><strong>Patentability:</strong> {sub.patentability}</p>
          {/if}
          <p><strong>Technologies:</strong> {sub.existingTechnologies}</p>
          <p><strong>Gap Analysis:</strong> {sub.gapAnalysis}</p>
          <p><strong>Marketing:</strong> {sub.Marketingdata}</p>
          <p><strong>Research Data:</strong> {sub.researchData}</p>
          <p><strong>Experimental Data:</strong> {sub.experimentalData}</p>
          {#if sub.visualizedProduct}
            <p><strong>Visual:</strong></p>
            {#if sub.visualizedProduct.endsWith('.pdf') || sub.visualizedProduct.endsWith('.doc') || sub.visualizedProduct.endsWith('.docx')}
              <a href={sub.visualizedProduct} target="_blank">📄 Open Document</a>
            {:else}
              <img src={sub.visualizedProduct} alt="Uploaded Visual" style="max-width: 100%; border-radius: 8px; margin-top: 0.5rem;" />
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <p>No submissions found.</p>
  {/if}
{/if}

<style>
  .submissions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .submission-card {
    background: #f1f7ff;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }

  .submission-card:hover {
    transform: translateY(-4px);
  }

  .submission-card h3 {
    margin: 0 0 0.5rem 0;
    color: #0057b8;
  }

  .submission-card p {
    margin: 0.3rem 0;
    font-size: 0.95rem;
  }
</style>
option>
          <option value="TECHNOLOGY">Technology</option>
          <option value="ENGINEERING">Engineering</option>
          <option value="MATH">Math</option>
          <option value="OTHERS">Others</option>
        </select>

        {#if showOtherCategory}
          <label>Other Category</label>
          <input bind:value={form.otherCategory} />
        {/if}

        <label>Description</label>
        <textarea bind:value={form.description} required></textarea>

        <label>Is it unique?</label>
        <select bind:value={form.uniqueness} required>
          <option value="">--Select--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {#if showPatentField}
          <label>Patentability Details</label>
          <textarea bind:value={form.patentability}></textarea>
        {/if}

        <label>Existing Technologies</label>
        <textarea bind:value={form.existingTechnologies}></textarea>

        <label>Gap Analysis</label>
        <textarea bind:value={form.gapAnalysis}></textarea>

        <label>Marketing Data</label>
        <textarea bind:value={form.Marketingdata}></textarea>

        <label>Research Data</label>
        <textarea bind:value={form.researchData}></textarea>

        <label>Experimental Data</label>
        <textarea bind:value={form.experimentalData}></textarea>

        <label>Upload Visual/Doc</label>
        <input type="file" accept="image/*,.pdf,.doc,.docx" on:change={(e) => file = e.target.files[0]} required />

        <label>
          <input type="checkbox" bind:checked={form.confirmSubmission} />
          I confirm submission
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

    {:else if activeSection === 'view'}
      <h1>📄 View Your Submissions</h1>
      <p>This section will show your submitted projects (coming soon).</p>
    {/if}
  </div>
</div>
