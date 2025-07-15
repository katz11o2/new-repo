<script>
  import { onMount } from 'svelte';

  let user = null;
  let userData = [];
  let loading = true;
  let error = '';

  const sheetAPI = "https://script.google.com/macros/s/AKfycbxK_PEHvy8cXW2JhMVJhC1p_am2NWKiEMKlyJtn18Fxe_EmS_FtkU3oU5a5_98qnX06/exec";

  // Check if user info is saved in localStorage (from SignIn page)
  onMount(async () => {
    const userDataJSON = localStorage.getItem('user');
    if (userDataJSON) {
      user = JSON.parse(userDataJSON);
      await fetchUserData();
    } else {
      window.location.href = '/'; // redirect if not signed in
    }
  });

  async function fetchUserData() {
    try {
      const res = await fetch(sheetAPI);
      const data = await res.json();

      // Filter only rows matching user email
      userData = data.filter(entry => entry.Email === user.email);
    } catch (err) {
      error = '❌ Failed to load data.';
      console.error(err);
    } finally {
      loading = false;
    }
  }

  function logout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
</script>

{#if loading}
  <p>⏳ Loading your data...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <h2>Welcome, {user.name} 👋</h2>
  <button on:click={logout}>Logout</button>

  {#if userData.length === 0}
    <p>No submissions found.</p>
  {:else}
    <h3>Your Submissions:</h3>
    <ul>
      {#each userData as item}
        <li>
          <strong>Q1:</strong> {item.Question1}<br />
          <strong>Q2:</strong> {item.Question2}<br />
          <strong>Image:</strong> <br /><img src={item.ImageURL} width="200" />
          <hr />
        </li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  img {
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  li {
    margin-bottom: 2rem;
  }
</style>
