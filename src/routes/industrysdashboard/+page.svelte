<script>
  import { onMount } from "svelte";

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_STORAGE = "jsonbin_industry_ideas";
  const IMGBB_API_KEY = "6b78d56b527f6dba58807d358ac35142";

  let newStatement = {
    category: "",
    title: "",
    description: "",
    uniqueness: "",
    existingTech: "",
    gapAnalysis: "",
    patentability: "",
    marketData: "",
    financials: "",
    attachments: ""
  };

  let file;
  let loading = false;

  const categories = [
    "New Product Development",
    "New Process Development",
    "New Features in Existing Product",
    "Problems in Existing Product",
    "Problems in Existing Processes"
  ];

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
    });
  }

  async function addStatement() {
    if (!newStatement.title || !newStatement.category) {
      alert("Please fill all required fields.");
      return;
    }

    loading = true;

    try {
      let imageUrl = "";
      if (file) {
        const base64 = await toBase64(file);
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: new URLSearchParams({ image: base64 })
        });
        const imgJson = await imgRes.json();
        imageUrl = imgJson?.data?.url || "";
      }

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
        title: newStatement.title,
        category: newStatement.category,
        description: newStatement.description,
        uniqueness: newStatement.uniqueness,
        existingTechnologies: newStatement.existingTech,
        gapAnalysis: newStatement.gapAnalysis,
        patentability: newStatement.patentability,
        Marketingdata: newStatement.marketData,
        researchData: newStatement.financials,
        experimentalData: "",
        visualizedProduct: imageUrl,
        submittedAt: new Date().toISOString()
      });

      const url = binId
        ? `https://api.jsonbin.io/v3/b/${binId}`
        : "https://api.jsonbin.io/v3/b";
      const method = binId ? "PUT" : "POST";

      const saveRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
          "X-Bin-Private": "true"
        },
        body: JSON.stringify(existing)
      });

      const result = await saveRes.json();
      if (!binId) {
        localStorage.setItem(BIN_KEY_STORAGE, result.metadata.id);
      }

      alert("✅ Challenge submitted!");
      newStatement = {
        category: "",
        title: "",
        description: "",
        uniqueness: "",
        existingTech: "",
        gapAnalysis: "",
        patentability: "",
        marketData: "",
        financials: "",
        attachments: ""
      };
      file = null;
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit.");
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-white">
  <div class="w-full max-w-3xl p-8 rounded-lg shadow-xl bg-white bg-opacity-90 backdrop-blur-lg border border-white/30 mt-5 mb-5">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Submit a Challenge</h2>

    <label class="block font-semibold text-gray-700 mb-2">Category</label>
    <select bind:value={newStatement.category} class="w-full p-3 border-2 rounded-lg bg-gray-50">
      <option value="" disabled>Select a category</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>

    <label class="block font-semibold text-gray-700 mt-4">Title</label>
    <input bind:value={newStatement.title} class="w-full p-3 border-2 rounded-lg bg-gray-50" placeholder="Enter title..." />

    <label class="block font-semibold text-gray-700 mt-4">Description</label>
    <textarea bind:value={newStatement.description} class="w-full p-3 border-2 rounded-lg bg-gray-50"></textarea>

    <label class="block font-semibold text-gray-700 mt-4">Uniqueness</label>
    <input bind:value={newStatement.uniqueness} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <label class="block font-semibold text-gray-700 mt-4">Existing Technologies</label>
    <input bind:value={newStatement.existingTech} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <label class="block font-semibold text-gray-700 mt-4">Gap Analysis</label>
    <input bind:value={newStatement.gapAnalysis} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <label class="block font-semibold text-gray-700 mt-4">Patentability</label>
    <input bind:value={newStatement.patentability} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <label class="block font-semibold text-gray-700 mt-4">Market Data</label>
    <input bind:value={newStatement.marketData} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <label class="block font-semibold text-gray-700 mt-4">Financials</label>
    <input bind:value={newStatement.financials} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <label class="block font-semibold text-gray-700 mt-4">Attachments</label>
    <input type="file" on:change={(e) => file = e.target.files[0]} class="w-full p-3 border-2 rounded-lg bg-gray-50" />

    <button on:click={addStatement} class="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600" disabled={loading}>
      {loading ? "Submitting..." : "Submit"}
    </button>
  </div>
</div>
