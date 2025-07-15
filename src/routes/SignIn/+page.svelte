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
    goto('/dashboard1');
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

<h2>Sign In with Google</h2>
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
    text-align: center;
    margin-top: 2rem;
  }
  .g_id_signin {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
