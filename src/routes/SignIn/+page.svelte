<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let question1 = '';
  let question2 = '';
  let imageFile = null;
  let statusMessage = '';
  let isSubmitting = false;

  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    user = data;
  }

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
    if (!user || !question1 || !question2 || !imageFile) {
      statusMessage = "❌ Please fill all fields and sign in.";
      return;
    }

    isSubmitting = true;
    statusMessage = "⏳ Uploading image...";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "svelte_upload"); // 🔁 Replace with your preset name

    try {
      const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dcnzrofcw/image/upload", {
        method: "POST",
        body: formData
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.secure_url) {
        statusMessage = "❌ Upload failed. Try another image.";
        return;
      }

      // Send form data + uploaded image URL to your backend
      const response = await fetch("https://cambrian-sparkzone.com/api/upload.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          question1,
          question2,
          imageUrl: uploadData.secure_url
        })
      });

      const result = await response.text();
      console.log(result);

      if (result.includes("✅")) {
        statusMessage = "✅ Submitted successfully! Redirecting...";
        setTimeout(() => goto('/Dashboard'), 2000);
      } else {
        statusMessage = "❌ Server failed: " + result;
      }

    } catch (err) {
      console.error(err);
      statusMessage = "❌ Connection failed.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- Google Login -->
<div id="g_id_onload"
     data-client_id="594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleCredentialResponse"
     data-auto_prompt="false">
</div>

<div class="g_id_signin" data-type="standard" data-size="large"></div>

<!-- Show Form After Login -->
{#if user}
  <h3>Hello, {user.name}</h3>

  <input bind:value={question1} placeholder="Answer Question 1" />
  <input bind:value={question2} placeholder="Answer Question 2" />
  <input type="file" accept="image/*" on:change={(e) => imageFile = e.target.files[0]} />

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
