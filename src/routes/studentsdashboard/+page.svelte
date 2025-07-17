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
  let showTerms = false;

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
    background: #ffffff;
    font-family: 'Segoe UI', sans-serif;
  }

  .glass-box {
    max-width: 750px;
    margin: 60px auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  label {
    font-weight: 600;
    display: block;
    margin-top: 1.5rem;
  }

  input, select, textarea {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.75rem;
    border-radius: 10px;
    border: 1.5px solid rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #4caf50;
    outline: none;
  }

  button {
    margin-top: 2rem;
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s;
  }

  button:hover {
    background-color: #43a047;
  }

  button[disabled] {
    background-color: #aaa;
    cursor: not-allowed;
  }

  .success-popup, .terms-popup {
    position: fixed;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-content {
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(20px);
    padding: 2rem;
    border-radius: 20px;
    max-width: 500px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }

  .checkbox-row {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .terms-link {
    color: #1976d2;
    cursor: pointer;
    text-decoration: underline;
  }

</style>

{#if showSuccess}
  <div class="success-popup">
    <div class="popup-content">
      <h3>✅ Submitted Successfully!</h3>
      <button on:click={() => { showSuccess = false; goto("/") }}>Close</button>
    </div>
  </div>
{/if}

{#if showTerms}
  <div class="terms-popup">
    <div class="popup-content">
      <h3>Terms and Conditions</h3>
      <p>This submission is final and stored securely. Ensure you have reviewed all fields before submitting.</p>
      <button on:click={() => showTerms = false}>Close</button>
    </div>
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

    <div class="checkbox-row">
      <input type="checkbox" bind:checked={form.confirmSubmission} />
      <span>I agree to all <span class="terms-link" on:click={() => showTerms = true}>terms and conditions</span></span>
    </div>

    <button type="submit" disabled={loading}>
      {loading ? "Uploading..." : "Submit"}
    </button>
  </form>
</div>
