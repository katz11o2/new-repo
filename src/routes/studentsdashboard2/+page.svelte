<script>
  import { onMount } from 'svelte';
  let userEmail = '';
  let files = [];
  let error = '';
  let loading = true;

  const CLOUD_NAME = 'dcnzrofcw';
  const CLOUD_API_KEY = '486427226727857';
  const CLOUD_API_SECRET = 'Hi0GEBpRYUdqKvm6SLVXVYx2VKU';

  onMount(async () => {
    try {
      const token = window.googleToken;
      if (!token) {
        error = "🔒 You must log in with Google.";
        loading = false;
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      userEmail = payload.email;

      const timestamp = Math.floor(Date.now() / 1000);
      const folder = `submissions/${userEmail}`; // Assuming this is how you organized it

      const paramsToSign = `prefix=${folder}&timestamp=${timestamp}${CLOUD_API_SECRET}`;
      const signature = await sha1(paramsToSign);

      const formData = new FormData();
      formData.append('timestamp', timestamp);
      formData.append('api_key', CLOUD_API_KEY);
      formData.append('signature', signature);
      formData.append('prefix', folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      files = data.resources;
    } catch (err) {
      error = "⚠️ Failed to fetch submissions: " + err.message;
    } finally {
      loading = false;
    }
  });

  async function sha1(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
</script>

<style>
  .card {
    padding: 1rem;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
  }
</style>

{#if loading}
  <p>Loading submissions...</p>
{:else if error}
  <p>{error}</p>
{:else if files.length === 0}
  <p>No submissions found for {userEmail}.</p>
{:else}
  <h2>📝 Submissions by {userEmail}</h2>
  {#each files as file}
    <div class="card">
      <h3>{file.public_id}</h3>
      <p><strong>Uploaded:</strong> {new Date(file.created_at).toLocaleString()}</p>
      <a href={file.secure_url} target="_blank">🔗 View File</a>
    </div>
  {/each}
{/if}
