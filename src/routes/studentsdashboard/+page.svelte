<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  // ✅ Use your Cloudinary config
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

  let showOtherCategory = false;
  $: showOtherCategory = form.category === "OTHERS";

  let showPatentField = false;
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

      // 🔼 Upload .txt file (form data) to Cloudinary
      const textFormData = new FormData();
      textFormData.append("file", textFile);
      textFormData.append("upload_preset", UPLOAD_PRESET);

      const textRes = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: textFormData
      });

      const textUpload = await textRes.json();
      if (!textUpload.secure_url) throw new Error("Failed to upload form text file.");

      // ✅ Store text file URL (if needed)
      const formFileURL = textUpload.secure_url;

      // 🔼 Upload visual file (optional)
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

      alert("✅ Successfully submitted and uploaded to Cloudinary!");
      console.log("📄 Text File URL:", formFileURL);
      console.log("📎 Visual File URL:", form.visualizedProduct);

      goto("/");

      // Reset form
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

  // ✅ Google Sign-in
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
