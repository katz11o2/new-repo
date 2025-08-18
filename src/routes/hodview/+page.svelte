<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let loggedIn = false;
  let selectedHOD = '';
  let hodEntries = [];

  const hodList = [
    "Mech HOD",
    "EEE HOD",
    "ECE HOD",
    "CSE HOD",
    "AIML HOD",
    "Civil HOD"
  ];

  async function login() {
    if (username === 'hod' && password === 'hod') {
      loggedIn = true;
    } else {
      alert("❌ Invalid credentials");
    }
  }

  async function fetchEntries() {
    if (!selectedHOD) return;

    const { data, error } = await supabase
      .from('design_idea_forwards')
      .select(`
        id,
        idea_id,
        send_to,
        comment,
        created_at,
        design_ideas ( title, description, category )
      `)
      .eq('send_to', selectedHOD)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      alert("❌ Failed to fetch entries");
    } else {
      hodEntries = data;
    }
  }

  async function updateComment(entryId, newComment) {
    const { error } = await supabase
      .from('design_idea_forwards')
      .update({ comment: newComment })
      .eq('id', entryId);

    if (error) {
      console.error(error);
      alert("❌ Failed to update comment");
    } else {
      alert("✅ Comment updated successfully");
      fetchEntries();
    }
  }
</script>

<style>
  .login-box {
    max-width: 400px;
    margin: 5rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .hod-selector {
    margin: 2rem auto;
    max-width: 400px;
  }

  .table-container {
    margin-top: 2rem;
    padding: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    border-radius: 12px;
    overflow: hidden;
  }

  th, td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: #0070f3;
    color: white;
  }

  td input {
    width: 100%;
    padding: 6px;
  }

  button {
    background: #0070f3;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background: #005bb5;
  }
</style>

{#if !loggedIn}
  <!-- Login Page -->
  <div class="login-box">
    <h2>🔑 HOD Login</h2>
    <input placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={login}>Login</button>
  </div>
{:else}
  <!-- HOD Selection -->
  {#if !selectedHOD}
    <div class="hod-selector">
      <h2>Select Your Department</h2>
      <select bind:value={selectedHOD} on:change={fetchEntries}>
        <option value="">-- Select HOD --</option>
        {#each hodList as hod}
          <option value={hod}>{hod}</option>
        {/each}
      </select>
    </div>
  {:else}
    <!-- Show Table -->
    <div class="table-container">
      <h2>{selectedHOD} - Assigned Ideas</h2>
      <table>
        <thead>
          <tr>
            <th>Idea Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each hodEntries as entry}
            <tr>
              <td>{entry.design_ideas?.title || 'No Title'}</td>
              <td>{entry.design_ideas?.description}</td>
              <td>{entry.design_ideas?.category}</td>
              <td>
                <input type="text" bind:value={entry.comment} />
              </td>
              <td>
                <button on:click={() => updateComment(entry.id, entry.comment)}>Save</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
{/if}
