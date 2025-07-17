<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

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

  let file = null;
  let loading = false;
  let success = false;

  $: showOtherCategory = form.category === "OTHERS";
  $: showPatentField = form.uniqueness === "Yes";

  async function submitForm() {
    if (!form.confirmSubmission || !file) {
      alert("Please upload a visual file and confirm submission.");
      return;
    }
    loading = true;

    try {
      const path = `uploads/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } =
        await supabase.storage.from('submissions-images').upload(path, file);
      if (uploadError) throw uploadError;

      const { publicUrl } = supabase.storage
        .from('submissions-images')
        .getPublicUrl(uploadData.path);
      form.visualizedProduct = publicUrl;

      const { error: dbError } = await supabase
        .from('submissions')
        .insert([{ ...form, submitted_at: new Date().toISOString() }]);
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
</script>

<style>
  body {
    background: linear-gradient(to bottom right, #dfe9f3, #ffffff);
    font-family: 'Segoe UI', sans-serif;
    padding: 2rem;
    margin: 0;
  }

  .glass-form {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    color: #000;
  }

  .glass-form h2 {
    margin-bottom: 1rem;
    font-weight: bold;
    text-align: center;
  }

  label {
    font-weight: 600;
    display: block;
    margin: 0.7rem 0 0.2rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    outline: none;
  }

  input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
  }

  button {
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 10px;
    background: #4a90e2;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    width: 100%;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background: #357abd;
  }

  .success {
    text-align: center;
    color: green;
    margin-bottom: 1rem;
    font-weight: bold;
  }
</style>

{#if success}
  <div class="success">🎉 Submitted successfully!</div>
{/if}

<div class="glass-form">
  <h2>Submit Project</h2>
  <form on:submit|preventDefault={submitForm}>
    <label>Title</label>
    <input bind:value={form.title} required />

    <label>Category</label>
    <select bind:value={form.category} required>
      <option value="">--Select--</option>
      <option value="SCIENCE">Science</option>
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

    <div>
      <input type="checkbox" bind:checked={form.confirmSubmission} />
      <label style="display: inline;">I confirm submission</label>
    </div>

    <button type="submit" disabled={loading}>
      {loading ? "Submitting..." : "Submit"}
    </button>
  </form>
</div>
