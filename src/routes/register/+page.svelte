<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const MASTER_KEY = '$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu';
  const BIN_ID = '655f0c7d12a5d3765993b4ae'; // Replace with your JSONBin bin ID

  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  async function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);

    const newEntry = {
      email: data.email,
      name: data.name,
      picture: data.picture,
      timestamp: new Date().toISOString()
    };

    try {
      // Fetch existing records
      const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': MASTER_KEY
        }
      });

      const existingData = await getRes.json();
      const updatedData = existingData.record || [];

      // Add new user
      updatedData.push(newEntry);

      // Save to JSONBin
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': MASTER_KEY,
          'X-Bin-Private': 'true'
        },
        body: JSON.stringify(updatedData)
      });

      goto('/studentsdashbaord2');
    } catch (err) {
      console.error('❌ Login Failed:', err);
      alert('❌ Login failed. Try again.');
    }
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
</script>

<h2>🔐 Login with Google</h2>
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
    font-family: 'Poppins', sans-serif;
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 1rem;
  }
  .g_id_signin {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
