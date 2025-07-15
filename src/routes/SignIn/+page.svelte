<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let question1 = '';
  let question2 = '';
  let imageFile = null;

  let isSubmitting = false;
  let statusMessage = '';

  // Decode Google JWT token
  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // Called by Google Sign-In on success
  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    user = data;
    console.log("✅ Logged in:", user);
  }

  // Load Google Sign-In library and assign callback
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

  async function submitForm() {
    if (!user) {
      statusMessage = "❌ Please sign in first.";
      return;
    }

    if (!question1 || !question2 || !imageFile) {
      statusMessage = "❌ Please fill in both questions and upload an image.";
      return;
    }

    if (isSubmitting) return;

    isSubmitting = true;
    statusMessage = "⏳ Submitting...";

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("question1", question1);
    formData.append("question2", question2);
    formData.append("image", imageFile);

    try {
      const res = await fetch("https://cambrian-sparkzone.com/api/upload.php", {
        method: "POST",
        body: formData
      });

      const result = await res.text();
      console.log(result);

      if (result.includes("✅")) {
        statusMessage = "✅ Submitted successfully! Redirecting to dashboard...";
        setTimeout(() => goto('/Dashboard'), 2000);
      } else {
        statusMessage = "❌ Submission failed. Server said: " + result;
      }
    } catch (err) {
      console.error(err);
      statusMessage = "❌ Submission failed. Check your connection.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- ✅ Google Sign-In -->
<div id="g_id_onload"
     data-client_id="594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleCredentialResponse"
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-size="large"
     data-theme="outline"
     data-text="sign_in_with">
</div>

<!-- ✅ Form UI (Only shows after login) -->
{#if user}
  <h3>Hello, {user.name}</h3>

  <input bind:value={question1} placeholder="Answer Question 1" />
  <input bind:value={question2} placeholder="Answer Question 2" />
  <input type="file" on:change={(e) => imageFile = e.target.files[0]} />

  <button on:click={submitForm} disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>

  {#if statusMessage}
    <p>{statusMessage}</p>
  {/if}
{/if}

<style>
  input, button {
    display: block;
    margin: 0.5rem 0;
    padding: 0.5rem;
    font-size: 1rem;
  }

  p {
    margin-top: 0.5rem;
    color: #333;
  }
</style>
