<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const MASTER_KEY = '$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu';
  const BIN_KEY_STORAGE = 'jsonbin_auth_data';
  const IMGBB_API_KEY = '6b78d56b527f6dba58807d358ac35142';

  let user = null;
  let q1 = '', q2 = '';
  let imageFile = null;
  let status = '', isSubmitting = false;

  onMount(() => {
    const u = localStorage.getItem('user');
    if (!u) goto('/SignIn');
    else user = JSON.parse(u);
  });

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  async function handleSubmit() {
    if (!user || !q1 || !q2 || !imageFile) {
      status = '❌ Fill all fields.';
      return;
    }

    isSubmitting = true;
    try {
      const imageBase64 = await toBase64(imageFile);
      const imgUpload = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: new URLSearchParams({ image: imageBase64 })
      });
      const imgData = await imgUpload.json();
      const imageUrl = imgData.data.url;

      let binId = localStorage.getItem(BIN_KEY_STORAGE);
      let existing = [];

      if (binId) {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
          headers: { 'X-Master-Key': MASTER_KEY }
        });
        const json = await res.json();
        existing = json.record || [];
      }

      existing.push({
        name: user.name,
        email: user.email,
        question1: q1,
        question2: q2,
        image: imageUrl,
        timestamp: new Date().toISOString()
      });

      const url = binId
        ? `https://api.jsonbin.io/v3/b/${binId}`
        : 'https://api.jsonbin.io/v3/b';

      const method = binId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': MASTER_KEY,
          'X-Bin-Private': 'true'
        },
        body: JSON.stringify(existing)
      });

      const result = await res.json();
      if (!binId) {
        localStorage.setItem(BIN_KEY_STORAGE, result.metadata.id);
      }

      status = '✅ Submitted!';
      q1 = ''; q2 = ''; imageFile = null;
    } catch (err) {
      status = '❌ Submission failed.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<h2>Submit Your Info</h2>
<p>{user?.email}</p>

<input bind:value={q1} placeholder="Question 1" />
<input bind:value={q2} placeholder="Question 2" />
<input type="file" accept="image/*" on:change={(e) => imageFile = e.target.files[0]} />

<button on:click={handleSubmit} disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>

{#if status}
  <p>{status}</p>
{/if}
