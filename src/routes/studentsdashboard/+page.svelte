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
      form.visualizedProduct = imgData.data.url;

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
        submittedBy: "Student"
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

      alert("✅ Submission successful!");
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
      alert("❌ Submission failed.");
    } finally {
      loading = false;
    }
  }
</script>
