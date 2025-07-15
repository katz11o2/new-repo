<script>
  import { onMount } from 'svelte';

  let user = null;
  let question1 = '';
  let question2 = '';
  let imageFile = null;
  let status = '';
  let isSubmitting = false;

  const imgbbApiKey = "6b78d56b527f6dba58807d358ac35142";
  const formspreeEndpoint = "https://formspree.io/f/mvgqoaby";

  // Google JWT decode
  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // Google Sign-In Callback
  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    user = {
      name: data.name,
      email: data.email,
    };
    console.log('✅ Logged in:', user);
  }

  // Load Google OAuth Script
  onMount(() => {
    if (typeof window !== 'undefined') {
      window.handleCredentialResponse = handleCredentialResponse;

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  async function handleSubmit() {
    if (!user) {
      status = '❌ Please sign in first.';
      return;
    }

    if (!question1 || !question2 || !imageFile) {
      status = '❌ Fill all fields and upload an image.';
      return;
    }

    isSubmitting = true;
    status = '⏳ Uploading image...';

    // Upload to ImgBB
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData
      });

      const imgResult = await resImg.json();
      if (!imgResult.success) throw new Error('Image upload failed');

      const imageUrl = imgResult.data.url;

      // Send to Formspree
      const resForm = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          question1,
          question2,
          image: imageUrl
        })
      });

      if (resForm.ok) {
        status = '✅ Submitted successfully!';
        question1 = '';
        question2 = '';
        imageFile = null;
      } else {
        status = '❌ Form submission failed.';
      }
    } catch (err) {
      console.error(err);
      status = '❌ Error during submission.';
    }

    isSubmitting = false;
  }
</script>

<!-- ✅ Google Sign-In -->
{#if !user}
  <div id="g_id_onload"
       data-client_id="594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com"
       data-callback="handleCredentialResponse"
       data-auto_prompt="false">
  </div>
  <div class="g_id_signin"
       data-type="standard"
       data-size="large"
       data-theme="outline"
       data-text="sign_in_with">
  </div>
{/if}

<!-- ✅ Show form after login -->
{#if user}
  <h3>Welcome, {user.name}</h3>

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
    color: #444;
    font-weight: 500;
  }
</style>
