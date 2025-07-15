<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const MASTER_KEY = '$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu';
  const BIN_KEY_STORAGE = 'jsonbin_auth_data';

  let user = null;
  let records = [];
  let loading = true;

  onMount(async () => {
    const u = localStorage.getItem('user');
    if (!u) return goto('/SignIn');
    user = JSON.parse(u);

    const binId = localStorage.getItem(BIN_KEY_STORAGE);
    if (!binId) return;

    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { 'X-Master-Key': MASTER_KEY }
      });
      const data = await res.json();
      records = data.record.filter(entry => entry.email === user.email);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });
</script>

<h2>📊 Your Submissions</h2>
{#if loading}
  <p>Loading...</p>
{:else if records.length === 0}
  <p>No submissions found.</p>
{:else}
  <ul>
    {#each records as r}
      <li>
        <strong>{r.question1}</strong> | {r.question2}<br/>
        <img src={r.image} alt="uploaded" width="100" /><br/>
        <small>{r.timestamp}</small>
      </li>
    {/each}
  </ul>
{/if}
