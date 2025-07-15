<script>
  let form = {
    title: "",
    category: "",
    description: "",
    visualizedProduct: "",
    confirmSubmission: false
  };

  let file;
  let loading = false;

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_ID = "665ed3f9acd3cb34a856b8e4"; // Replace with your actual BIN ID
  const IMGBB_API_KEY = "6b78d56b527f6dba58807d358ac35142";

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
      alert("Please confirm and upload a file.");
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

      const token = window.googleToken;
      if (!token) throw new Error("Google token missing");
      const payload = JSON.parse(atob(token.split('.')[1]));

      const newEntry = {
        ...form,
        submittedAt: new Date().toISOString(),
        submittedByEmail: payload.email
      };

      const binFetch = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': MASTER_KEY }
      });
      const binData = await binFetch.json();
      const updatedRecords = [...(binData.record || []), newEntry];

      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY
        },
        body: JSON.stringify(updatedRecords)
      });

      alert("✅ Submission successful!");
      file = null;
      form = {
        title: "",
        category: "",
        description: "",
        visualizedProduct: "",
        confirmSubmission: false
      };
    } catch (e) {
      console.error(e);
      alert("❌ Submission failed: " + e.message);
    } finally {
      loading = false;
    }
  }
</script>

<div class="form-container">
  <h2>🚀 Submit Your Idea</h2>
  <form on:submit|preventDefault={submitForm}>
    <input type="text" placeholder="Title" bind:value={form.title} />
    <input type="text" placeholder="Category" bind:value={form.category} />
    <textarea placeholder="Description" bind:value={form.description}></textarea>
    <input type="file" accept="image/*,.pdf" on:change={(e) => file = e.target.files[0]} />
    <label><input type="checkbox" bind:checked={form.confirmSubmission} /> Confirm submission</label>
    <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
  </form>
</div>

<style>
  .form-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    font-family: sans-serif;
  }
  input, textarea {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  button {
    padding: 0.75rem;
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
  }
</style>
