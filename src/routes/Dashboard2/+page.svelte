<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let submissions = [];
  let loading = true;
  let error = '';

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const BIN_KEY_STORAGE = "jsonbin_design_ideas";

  // Decode JWT token
  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // Handle Google login
  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    user = { name: data.name, email: data.email };
    localStorage.setItem('user', JSON.stringify(user));
    fetchData();
  }

  // Fetch data after login
  async function fetchData() {
    loading = true;
    error = '';
    try {
      const binId = localStorage.getItem(BIN_KEY_STORAGE);
      if (!binId) throw new Error('No submissions found yet.');

      const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
          'X-Master-Key': MASTER_KEY
        }
      });

      const json = await res.json();
      const allRecords = json.record || [];
      submissions = allRecords.filter(item => item && item.submittedBy === "Student" && item.email === user.email);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      goto('/SignIn');
    } else {
      user = JSON.parse(savedUser);
      fetchData();
    }

    // Load Google Sign-In
    if (typeof window !== 'undefined') {
      window.handleCredentialResponse = handleCredentialResponse;
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
</script>

<h2>Your Submitted Ideas</h2>

{#if loading}
  <p>⏳ Loading...</p>
{:else if error}
  <p style="color:red">❌ {error}</p>
{:else if submissions.length === 0}
  <p>📭 No submissions found for {user?.email}</p>
{:else}
  <ul>
    {#each submissions as item, index}
      <li>
        <strong>{index + 1}. {item.title}</strong><br />
        <small>Category: {item.category}</small><br />
        <small>Submitted At: {item.submittedAt}</small><br />
        {#if item.visualizedProduct}
          <img src={item.visualizedProduct} alt="submission" style="max-width: 200px; margin: 10px 0;" />
        {/if}
        <hr />
      </li>
    {/each}
  </ul>
{/if}

<style>
  h2 {
    text-align: center;
    margin-top: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    max-width: 700px;
    margin: 2rem auto;
  }
  li {
    padding: 1rem;
    background: #f9fafb;
    border-radius: 10px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
</style>
