<script>
  import { supabase } from '$lib/supabase'; // assumes you’ve set this up
  import { onMount } from "svelte";

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

  let success = false;
  let loading = false;

  async function submitForm() {
    if (!form.confirmSubmission) {
      alert("❗Please confirm the submission.");
      return;
    }

    loading = true;

    try {
      const { error } = await supabase.from('submissions').insert([form]);

      if (error) {
        console.error("Insert error:", error);
        alert("❌ Error while submitting form.");
      } else {
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
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      loading = false;
    }
  }
</script>

<style>
  .glass-form {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #fff;
    font-family: sans-serif;
  }

  label {
    margin-top: 1rem;
    display: block;
    font-weight: bold;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.6rem;
    margin-top: 0.3rem;
    border-radius: 8px;
    border: none;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 12px;
    background: #ffffff30;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s ease;
  }

  button:hover {
    background: #ffffff50;
  }

  .success-msg {
    text-align: center;
    color: #00ffae;
    font-weight: bold;
    margin-top: 1rem;
  }

  body {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    min-height: 100vh;
    padding: 2rem;
  }
</style>

<div class="glass-form">
  <h2>📤 Submit Project</h2>

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
      <label>Patentability</label>
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

    <label>Visualized Product (URL or notes)</label>
    <input bind:value={form.visualizedProduct} />

    <label>
      <input type="checkbox" bind:checked={form.confirmSubmission} />
      I confirm that the above information is correct.
    </label>

    <button type="submit" disabled={loading}>
      {loading ? "Submitting..." : "Submit"}
    </button>
  </form>

  {#if success}
    <p class="success-msg">✅ Submitted successfully!</p>
  {/if}
</div>
