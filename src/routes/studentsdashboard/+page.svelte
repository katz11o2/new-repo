<script>
  import { goto } from "$app/navigation";

  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dcnzrofcw/auto/upload";
  const UPLOAD_PRESET = "svelte_upload";

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
  let showSuccess = false;

  $: showOtherCategory = form.category === "OTHERS";
  $: showPatentField = form.uniqueness === "Yes";

  function generateTextFileFromForm(formObj) {
    const lines = Object.entries(formObj).map(([key, val]) => `${key}: ${val}`);
    const blob = new Blob([lines.join('\n')], { type: "text/plain" });
    return new File([blob], `${formObj.title || 'submission'}.txt`, { type: "text/plain" });
  }

  async function submitForm() {
    if (!form.confirmSubmission) {
      alert("Please confirm the submission.");
      return;
    }

    loading = true;

    try {
      const token = window.googleToken;
      if (!token) throw new Error("Google sign-in token missing.");

      const payload = JSON.parse(atob(token.split('.')[1]));

      const textFile = generateTextFileFromForm({
        ...form,
        submittedAt: new Date().toISOString(),
        submittedBy: "Student",
        submittedByEmail: payload.email
      });

      const textFormData = new FormData();
      textFormData.append("file", textFile);
      textFormData.append("upload_preset", UPLOAD_PRESET);

      const textRes = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: textFormData
      });

      const textUpload = await textRes.json();
      if (!textUpload.secure_url) throw new Error("Failed to upload text file.");

      const formFileURL = textUpload.secure_url;

      if (file) {
        const visualFormData = new FormData();
        visualFormData.append("file", file);
        visualFormData.append("upload_preset", UPLOAD_PRESET);

        const visualRes = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: visualFormData
        });

        const visualUpload = await visualRes.json();
        if (!visualUpload.secure_url) throw new Error("Failed to upload visual file.");
        form.visualizedProduct = visualUpload.secure_url;
      }

      showSuccess = true;

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
      alert("❌ Error: " + err.message);
    } finally {
      loading = false;
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    font-family: Arial, sans-serif;
  }

  .glass-box {
    max-width: 700px;
    margin: 50px auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  label {
    font-weight: bold;
    display: block;
    margin-top: 1rem;
  }

  input, select, textarea {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.6rem;
    border-radius: 8px;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    width: 100%;
  }

  button[disabled] {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }

  .success-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255,255,255,0.25);
    backdrop-filter: blur(20px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    z-index: 100;
    text-align: center;
  }
</style>

{#if showSuccess}
  <div class="success-popup">
    <h3>✅ Submitted Successfully!</h3>
    <button on:click={() => { showSuccess = false; goto('/') }}>Close</button>
  </div>
{/if}

<div class="glass-box">
  <form on:submit|preventDefault={submitForm}>
    <h2>Submit Project</h2>

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

    <label>Upload Visual/Doc (optional)</label>
    <input type="file" accept=".png,.jpg,.pdf,.doc,.docx" on:change={(e) => file = e.target.files[0]} />

    <label>
      <input type="checkbox" bind:checked={form.confirmSubmission} />
      I confirm that the above information is correct.
    </label>

    <button type="submit" disabled={loading}>
      {loading ? "Uploading..." : "Submit"}
    </button>
  </form>
</div>
