<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let question1 = '';
  let question2 = '';
  let imageFile = null;
  let status = '';
  let isSubmitting = false;

  const imgbbApiKey = '6b78d56b527f6dba58807d358ac35142';
  const scriptEndpoint = 'https://script.google.com/macros/s/AKfycbyxQi0QCVOfJ92zVYjjnzeXW-VGhRFmKWsn8Vo98OMDnmx7b9uFbIff9WjXdAZsom_l/exec';

  onMount(() => {
    const localUser = localStorage.getItem('user');
    if (!localUser) {
      goto('/SignIn');
    } else {
      user = JSON.parse(localUser);
    }
  });

  async function handleSubmit() {
    if (!user || !question1 || !question2 || !imageFile) {
      status = '❌ Please fill all fields.';
      return;
    }

    isSubmitting = true;
    status = '⏳ Uploading image...';

    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append('image', imageFile);

      const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData
      });

      const imgResult = await resImg.json();
      if (!imgResult.success) throw new Error('Image upload failed');

      const imageUrl = imgResult.data.url;

      // Send form data to Google Apps Script
      status = '📤 Submitting to Google Sheet...';

      const response = await fetch(scriptEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          question1,
          question2,
          imageURL: imageUrl
        })
      });

      const result = await response.json();
      if (result.success) {
        status = '✅ Submitted successfully!';
        question1 = '';
        question2 = '';
        imageFile = null;
      } else {
        throw new Error('Failed to submit data.');
      }
    } catch (error) {
      console.error(error);
      status = `❌ ${error.message}`;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<h2>Dashboard</h2>

{#if user}
  <p>Logged in as <strong>{user.name}</strong> ({user.email})</p>

  <input bind:value={question1} placeholder="Answer Question 1" />
  <input bind:value={question2} placeholder="Answer Question 2" />
  <input type="file" accept="image/*" on:change={(e) => imageFile = e.target.files[0]} />

  <button on:click={handleSubmit} disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
{/if}

{#if status}
  <p>{status}</p>
{/if}

<style>
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  input, button {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0.5rem 0;
    padding: 0.6rem;
    font-size: 1rem;
  }

  p {
    margin-top: 1rem;
    color: #333;
  }
</style>
