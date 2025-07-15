<script>
  import { onMount } from 'svelte';
  let user = null;
  let loading = true;
  let question1 = '';
  let question2 = '';
  let imageFile = null;
  let status = '';
  let isSubmitting = false;

  const imgbbApiKey = '6b78d56b527f6dba58807d358ac35142';
  const scriptEndpoint = 'https://script.google.com/macros/s/AKfycbxK_PEHvy8cXW2JhMVJhC1p_am2NWKiEMKlyJtn18Fxe_EmS_FtkU3oU5a5_98qnX06/exec';

  onMount(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      user = JSON.parse(saved);
    } else {
      window.location.href = '/SignIn';
    }
    loading = false;
  });

  async function handleSubmit() {
    if (!question1 || !question2 || !imageFile) {
      status = '❌ Fill all fields.';
      return;
    }

    isSubmitting = true;
    status = '⏳ Uploading image...';

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData
      });

      const imgResult = await resImg.json();
      if (!imgResult.success) throw new Error('❌ Image upload failed.');
      const imageURL = imgResult.data.url;

      status = '📤 Submitting to Google Sheet...';

      const resForm = await fetch(scriptEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          question1,
          question2,
          imageURL
        })
      });

      const responseText = await resForm.text();
      console.log('📄 Response:', responseText);

      if (resForm.ok) {
        status = '✅ Submitted successfully!';
        question1 = '';
        question2 = '';
        imageFile = null;
      } else {
        throw new Error('❌ Submission failed.');
      }

    } catch (err) {
      console.error(err);
      status = '❌ ' + err.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if loading}
  <p>⏳ Loading...</p>
{:else}
  <h2>Welcome, {user.name}</h2>
  <p>Email: {user.email}</p>

  <input bind:value={question1} placeholder="Answer Question 1" />
  <input bind:value={question2} placeholder="Answer Question 2" />
  <input type="file" accept="image/*" on:change={(e) => imageFile = e.target.files[0]} />

  <button on:click={handleSubmit} disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>

  {#if status}
    <p>{status}</p>
  {/if}
{/if}

<style>
  h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  input, button {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0.5rem 0;
    padding: 0.6rem;
    font-size: 1rem;
  }
  p { font-weight: 500; margin-top: 1rem; }
</style>
