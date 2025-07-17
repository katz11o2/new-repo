<script>
<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { supabase } from '$lib/supabase';

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
      if (!token) throw new Error("Google sign-in token missing. Please sign in.");

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
      if (!textUpload.secure_url) throw new Error("Failed to upload form text file.");
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

      // 👉 Insert to Supabase
      const { error } = await supabase.from('submissions').insert([{
        ...form,
        submitted_by: payload.email,
        text_file_url: formFileURL,
        submitted_at: new Date().toISOString()
      }]);

      if (error) throw new Error("Supabase insert failed: " + error.message);

      alert("✅ Successfully submitted and uploaded to Cloudinary & Supabase!");
      console.log("📄 Text File URL:", formFileURL);
      console.log("📎 Visual File URL:", form.visualizedProduct);

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
    } catch (err) {
      console.error(err);
      alert("❌ Error: " + err.message);
    } finally {
      loading = false;
    }
  }

  function handleCredentialResponse(response) {
    window.googleToken = response.credential;
    console.log("✅ Google Signed In");
  }

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      google.accounts.id.initialize({
        client_id: "594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com",
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

<!-- rest of your form HTML remains unchanged -->

</script>

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

  <div id="gSignInDiv"></div>

  <button type="submit" disabled={loading}>
    {loading ? "Uploading..." : "Submit"}
  </button>
</form>
  