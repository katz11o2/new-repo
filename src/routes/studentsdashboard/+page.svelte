<script>
  import { goto } from "$app/navigation";

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

  let file;
  let loading = false;

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_STORAGE = "jsonbin_design_ideas";
  const IMGBB_API_KEY = "6b78d56b527f6dba58807d358ac35142";

  let showOtherCategory = false;
  $: showOtherCategory = form.category === "OTHERS";

  let showPatentField = false;
  $: showPatentField = form.uniqueness === "Yes";

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = error => reject(error);
    });
  }

  async function submitForm() {
    if (!form.confirmSubmission || !file) {
      alert("Please confirm the submission and upload a visual file.");
      return;
    }

    loading = true;
    try {
      const imageBase64 = await toBase64(file);
      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: new URLSearchParams({ image: imageBase64 })
      });
      const imgData = await imgRes.json();
      if (!imgData.success) throw new Error("Image upload failed");

      form.visualizedProduct = imgData.data.url;

      // ✅ Add Google token handling
      const token = window.googleToken;
      if (!token) throw new Error("Google token missing");
      const payload = JSON.parse(atob(token.split('.')[1]));

      let binId = localStorage.getItem(BIN_KEY_STORAGE);
      let existing = [];

      if (binId) {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
          headers: { "X-Master-Key": MASTER_KEY }
        });
        const json = await res.json();
        existing = json.record || [];
      }

      existing.push({
        ...form,
        submittedAt: new Date().toISOString(),
        submittedBy: "Student",
        submittedByEmail: payload.email
      });

      const url = binId ? `https://api.jsonbin.io/v3/b/${binId}` : "https://api.jsonbin.io/v3/b";
      const method = binId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
          "X-Bin-Private": "true"
        },
        body: JSON.stringify(existing)
      });

      const result = await response.json();
      if (!binId) {
        localStorage.setItem(BIN_KEY_STORAGE, result.metadata.id);
      }

      alert("\u2705 Submission successful!");
      goto("/");
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
    } catch (e) {
      console.error(e);
      alert("\u274C Submission failed: " + e.message);
    } finally {
      loading = false;
    }
  }
</script>

<style>
  body {
    font-family: 'Poppins', sans-serif;
    background: url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(to top right, #dbeafe, #f0f9ff);
    background-size: cover;
    margin: 0;
    padding: 0;
  }
  .glass-box {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(14px);
    border-radius: 20px;
    padding: 2rem;
    max-width: 900px;
    width: 100%;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(147, 197, 253, 0.4);
    margin: 60px auto;
    animation: fadeIn 0.6s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  form input, form textarea, form select {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid #dbeafe;
    border-radius: 10px;
    padding: 12px;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  form input:focus, form textarea:focus, form select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
  button {
    background: #3b82f6;
    color: white;
    font-size: 1.1rem;
    border: none;
    border-radius: 10px;
    padding: 12px;
    width: 100%;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  button:hover {
    background: #2563eb;
  }
  h1 {
    text-align: center;
    font-size: 2rem;
    color: #1e3a8a;
    margin-bottom: 1.5rem;
  }
  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .checkbox input {
    width: auto;
  }
  .upload-label {
    font-weight: 600;
    color: #2563eb;
    margin-bottom: 0.5rem;
    display: block;
  }
  .note {
    font-size: 0.9rem;
    color: #1e40af;
    font-style: italic;
    text-align: center;
    margin-bottom: 1rem;
  }
</style>

<div class="glass-box">
  <h1>🚀 Submit Your Design Idea</h1>
  <form on:submit|preventDefault={submitForm}>
    <input maxlength="100" bind:value={form.title} placeholder="Title" />
    <select bind:value={form.category}>
      <option value="">Select Category</option>
      <option value="CSE">Computer Science and Engineering</option>
      <option value="AIML">Mechanical Engineering</option>
      <option value="EEE">Electrical Engineering</option>
      <option value="MECH">Chemical Engineering</option>
      <option value="OTHERS">Others</option>
    </select>
    {#if showOtherCategory}
      <input maxlength="100" bind:value={form.otherCategory} placeholder="Specify other category" />
    {/if}
    <textarea maxlength="100" bind:value={form.description} placeholder="Description"></textarea>
    <select bind:value={form.uniqueness}>
      <option value="">Is there any uniqueness?</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
    {#if showPatentField}
      <input maxlength="100" bind:value={form.patentability} placeholder="Patentability Info" />
    {/if}
    <input maxlength="100" bind:value={form.existingTechnologies} placeholder="Existing Technologies" />
    <input maxlength="100" bind:value={form.gapAnalysis} placeholder="Gap-Analysis / Problem Elimination" />
    <input maxlength="100" bind:value={form.Marketingdata} placeholder="Market / Marketing Data" />
    <input maxlength="100" bind:value={form.researchData} placeholder="Research Data" />
    <input maxlength="100" bind:value={form.experimentalData} placeholder="Experimental Data" />
    <label class="upload-label">Upload Visualized Product</label>
    <input type="file" on:change={(e) => file = e.target.files[0]} accept="image/*,.pdf,.docx" />
    <div class="note">Only visual files are accepted (PDF, DOCX, images).</div>
    <div class="checkbox">
      <input type="checkbox" bind:checked={form.confirmSubmission} />
      <span>I confirm the submission and understand the terms.</span>
    </div>
    <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
  </form>
</div>