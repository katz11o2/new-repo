<script>
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

<style>
  .form-section {
    background: linear-gradient(to bottom right, #e0f2fe, #f8fafc);
    padding: 60px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-card {
    width: 100%;
    max-width: 800px;
    background: rgba(255, 255, 255, 0.7);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(16px);
    border: 1px solid #e2e8f0;
  }

  .form-card h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    color: #1e40af;
  }

  label {
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
    color: #1e293b;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 14px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    background-color: #f9fafb;
    transition: border 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #3b82f6;
    outline: none;
    background-color: white;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button {
    width: 100%;
    background-color: #1d4ed8;
    color: white;
    padding: 14px;
    font-size: 1rem;
    border-radius: 12px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-top: 12px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2563eb;
  }

  @media (max-width: 600px) {
    .form-card {
      padding: 24px;
    }
  }
</style>

<div class="form-section">
  <div class="form-card">
    <h2>📌 Submit Your Industry Challenge</h2>

    <label>Category *</label>
    <select bind:value={newStatement.category}>
      <option value="" disabled>Select a category</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>

    <label>Title *</label>
    <input bind:value={newStatement.title} placeholder="Enter a descriptive title" />

    <label>Description</label>
    <textarea bind:value={newStatement.description} placeholder="Explain the problem in detail"></textarea>

    <label>Uniqueness</label>
    <input bind:value={newStatement.uniqueness} placeholder="What makes it unique?" />

    <label>Existing Technologies</label>
    <input bind:value={newStatement.existingTech} placeholder="What already exists?" />

    <label>Gap Analysis</label>
    <input bind:value={newStatement.gapAnalysis} placeholder="What is the gap you identified?" />

    <label>Patentability</label>
    <input bind:value={newStatement.patentability} placeholder="Can this be patented?" />

    <label>Market Data</label>
    <input bind:value={newStatement.marketData} placeholder="Any related market statistics?" />

    <label>Financials</label>
    <input bind:value={newStatement.financials} placeholder="Any cost estimates or returns?" />

    <label>Attachments</label>
    <input type="file" on:change={(e) => file = e.target.files[0]} accept="image/*,.pdf,.docx" />

    <button on:click={addStatement} disabled={loading}>
      {loading ? "Submitting..." : "Submit Challenge"}
    </button>
  </div>
</div>
