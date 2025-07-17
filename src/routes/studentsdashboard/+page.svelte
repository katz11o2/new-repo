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
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("otherCategory", form.otherCategory);
    formData.append("description", form.description);
    formData.append("uniqueness", form.uniqueness);
    formData.append("patentability", form.patentability);
    formData.append("existingTechnologies", form.existingTechnologies);
    formData.append("gapAnalysis", form.gapAnalysis);
    formData.append("Marketingdata", form.Marketingdata);
    formData.append("researchData", form.researchData);
    formData.append("experimentalData", form.experimentalData);
    formData.append("file", file);

    const res = await fetch("https://cambrian-sparkzone.com/api/submit.php", {
      method: "POST",
      body: formData
    });

    const result = await res.json();

    if (result.success) {
      alert("✅ Submission successful!");
      goto("/");
    } else {
      alert("❌ Submission failed: " + result.error);
    }

  } catch (err) {
    console.error(err);
    alert("❌ Submission failed: " + err.message);
  } finally {
    loading = false;
  }
}


  // Google Sign-In setup
  function handleCredentialResponse(response) {
    window.googleToken = response.credential;
    console.log("Signed in with Google");
  }

  // Load Google Sign-In on component mount
  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      google.accounts.id.initialize({
        client_id: "594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com", // 🔁 Replace this
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(document.getElementById("gSignInDiv"), {
        theme: "outline",
        size: "large"
      });
    };
    document.head.appendChild(script);
  });
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

  <div id="gSignInDiv" style="margin-bottom: 1rem; display: flex; justify-content: center;"></div>

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
