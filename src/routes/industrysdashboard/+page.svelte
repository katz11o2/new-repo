<script>
  import { goto } from "$app/navigation";

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_STORAGE = "jsonbin_industry_ideas";
  const IMGBB_API_KEY = "6b78d56b527f6dba58807d358ac35142";

  let statement = {
    category: "",
    title: "",
    description: "",
    uniqueness: "",
    existingTech: "",
    gapAnalysis: "",
    patentability: "",
    marketData: "",
    financials: ""
  };

  let file = null;
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

  async function handleSubmit() {
    if (!statement.title || !statement.category) {
      alert("Please fill in Title and Category.");
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
  ...statement,
  visualizedProduct: imageUrl,
  submittedAt: new Date().toISOString(),
  submittedBy: "Industry"
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

      alert("✅ Challenge submitted successfully!");
      goto("/");

      // Reset form
      statement = {
        category: "",
        title: "",
        description: "",
        uniqueness: "",
        existingTech: "",
        gapAnalysis: "",
        patentability: "",
        marketData: "",
        financials: ""
      };
      file = null;

    } catch (err) {
      console.error(err);
      alert("❌ Submission failed.");
    } finally {
      loading = false;
    }
  }
</script>

<style>
  .form-section {
    background: linear-gradient(to bottom right, #f1f5f9, #ffffff);
    padding: 60px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-card {
    width: 100%;
    max-width: 760px;
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid #e2e8f0;
  }

  .form-card h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    color: #1e3a8a;
  }

  label {
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
    color: #334155;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 14px;
    font-size: 1rem;
    margin-bottom: 18px;
    border: 1.8px solid #cbd5e1;
    border-radius: 10px;
    background-color: #f8fafc;
    transition: border 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #1e3a8a;
    outline: none;
    background-color: white;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button {
    width: 100%;
    background-color: #1e3a8a;
    color: white;
    padding: 14px;
    font-size: 1rem;
    border-radius: 10px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #294faa;
  }
</style>

<div class="form-section">
  <div class="form-card">
    <h2>Submit a Challenge</h2>

    <label>Category</label>
    <select bind:value={statement.category}>
      <option value="" disabled>Select a category</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>

    <label>Title</label>
    <input bind:value={statement.title} placeholder="Enter a descriptive title" />

    <label>Description</label>
    <textarea bind:value={statement.description} placeholder="Explain the problem in detail"></textarea>

    <label>Uniqueness</label>
    <input bind:value={statement.uniqueness} placeholder="What makes it unique?" />

    <label>Existing Technologies</label>
    <input bind:value={statement.existingTech} placeholder="What exists already?" />

    <label>Gap Analysis</label>
    <input bind:value={statement.gapAnalysis} placeholder="What's missing in current process?" />

    <label>Patentability</label>
    <input bind:value={statement.patentability} placeholder="Is it patentable?" />

    <label>Market Data</label>
    <input bind:value={statement.marketData} placeholder="Any marketing data?" />

    <label>Financials</label>
    <input bind:value={statement.financials} placeholder="Any cost estimates or funding info" />

    <label>Upload Attachment (Optional)</label>
    <input type="file" accept="image/*,.pdf,.docx" on:change={(e) => file = e.target.files[0]} />

    <button on:click={handleSubmit} disabled={loading}>
      {loading ? "Submitting..." : "Submit Challenge"}
    </button>
  </div>
</div>
