<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores';
  import { get } from 'svelte/store';

  let userData = null;
  let sheetData = [];
  let question1 = '';
  let question2 = '';
  let imageFile = null;
  let status = '';
  let loading = true;
  let submitting = false;

  const sheetEndpoint = 'https://script.google.com/macros/s/AKfycbxK_PEHvy8cXW2JhMVJhC1p_am2NWKiEMKlyJtn18Fxe_EmS_FtkU3oU5a5_98qnX06/exec';
  const imgbbKey = '6b78d56b527f6dba58807d358ac35142';

  onMount(async () => {
    const u = get(user);
    if (!u) {
      goto('/');
      return;
    }

    userData = u;

    try {
      const res = await fetch(sheetEndpoint);
      const all = await res.json();
      sheetData = all.filter(row => row.Email === userData.email);
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  });

  async function handleSubmit() {
    if (!question1 || !question2 || !imageFile) {
      status = '❌ Fill in all fields and upload an image.';
      return;
    }

    submitting = true;
    status = '⏳ Uploading image...';

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
      });

      const imgData = await resImg.json();
      if (!imgData.success) throw new Error('Image upload failed');

      const payload = {
        name: userData.name,
        email: userData.email,
        question1,
        question2,
        image: imgData.data.url
      };

      status = '⏳ Submitting to Google Sheet...';

      const resSheet = await fetch(sheetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resSheet.ok) throw new Error('Failed to submit to sheet');

      status = '✅ Submitted!';
      question1 = '';
      question2 = '';
      imageFile = null;

      // Reload submissions
      const res = await fetch(sheetEndpoint);
      const all = await res.json();
      sheetData = all.filter(row => row.Email === userData.email);
    } catch (err) {
      console.error(err);
      status = '❌ Error during submission.';
    } finally {
      submitting = false;
    }
  }
</script>

{#if loading}
  <p>Loading your dashboard...</p>
{:else}
  <h2>Welcome, {userData.name}</h2>
  <img src={userData.picture} alt="profile" width="80" />

  <h3>Submit Details</h3>
  <input bind:value={question1} placeholder="Question 1" />
  <input bind:value={question2} placeholder="Question 2" />
  <input type="file" accept="image/*" on:change={(e) => imageFile = e.target.files[0]} />
  <button on:click={handleSubmit} disabled={submitting}>
    {submitting ? 'Submitting...' : 'Submit'}
  </button>
  {#if status}<p>{status}</p>{/if}

  <h3>Your Submissions</h3>
  {#if sheetData.length === 0}
    <p>No data yet.</p>
  {:else}
    <ul>
      {#each sheetData as row}
        <li>
          <strong>Q1:</strong> {row.Question1}<br />
          <strong>Q2:</strong> {row.Question2}<br />
          <img src={row.Image} alt="submitted" width="200" />
        </li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  input, button {
    display: block;
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
    max-width: 400px;
  }
  img {
    margin-top: 0.5rem;
    border-radius: 6px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
  }
</style>
