<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;

  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    user = { name: data.name, email: data.email };
    localStorage.setItem('user', JSON.stringify(user));
    goto('/dashboard'); // Go to dashboard after login
  }

  onMount(() => {
    window.handleCredentialResponse = handleCredentialResponse;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
</script>

<h2>Login</h2>

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

<style>
  h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .g_id_signin {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
