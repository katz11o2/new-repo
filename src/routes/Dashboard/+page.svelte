<script>
  import { onMount } from 'svelte';

  let user = null;
  let submissions = [];

  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    user = data;
    fetchSubmissions(user.email);
  }

  async function fetchSubmissions(email) {
    try {
      const res = await fetch(`http://cambrian-sparkzone.com/api/get_submissions.php?email=${email}`);
      submissions = await res.json();
    } catch (error) {
      console.error("Fetching submissions failed:", error);
    }
  }

  // Load Google script
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
</script>

<!-- Google Sign-In -->
<div id="g_id_onload"
     data-client_id="594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com"
     data-callback="handleCredentialResponse"
     data-auto_prompt="false">
</div>
<div class="g_id_signin" data-type="standard" data-size="large"></div>

<!-- If logged in, show submissions -->
{#if user}
  <h2>👋 Welcome, {user.name}</h2>
  <h3>🗂 Your Submissions:</h3>

  {#if submissions.length === 0}
    <p>❗No submissions yet.</p>
  {:else}
    {#each submissions as sub}
      <div style="border: 1px solid #ccc; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
        <p><strong>Question 1:</strong> {sub.question1}</p>
        <p><strong>Question 2:</strong> {sub.question2}</p>
        {#if sub.image_path}
          <img src={`http://cambrian-sparkzone.com/api/${sub.image_path}`} alt="Uploaded Image" width="250" style="margin-top: 10px;" />
        {/if}
        <p><em>Submitted at: {sub.submitted_at}</em></p>
      </div>
    {/each}
  {/if}
{/if}
