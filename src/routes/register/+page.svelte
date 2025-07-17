<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let captchaInput = '';
  let generatedCaptcha = '';

  // Generate a random 4-digit captcha
  function generateCaptcha() {
    generatedCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
  }

  function handleFormLogin() {
    if (!email || !password || captchaInput !== generatedCaptcha) {
      alert('Invalid login or captcha!');
      generateCaptcha();
      return;
    }
    alert(`Logged in manually as ${email}`);
    goto('/studentsdashboard'); // ✅ Redirect after manual login
  }

  function handleGoogleLogin(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));
    alert(`Logged in with Google as ${data.name} (${data.email})`);
    goto('/studentsdashboard'); // ✅ Redirect after Google login
  }

  onMount(() => {
    generateCaptcha();

    // Google Sign-In
    window.handleGoogleLogin = handleGoogleLogin;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
</script>

<style>
  .login-box {
    max-width: 400px;
    margin: 5rem auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    background: white;
    font-family: 'Poppins', sans-serif;
  }
  h2 {
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 1.5rem;
  }
  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  .captcha {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    background: #f1f5f9;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 1rem;
    color: #1e3a8a;
  }
  button {
    width: 100%;
    background: #1e3a8a;
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background: #2c4c9a;
  }
</style>

<div class="login-box">
  <h2>Login</h2>

  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />

  <div class="captcha">{generatedCaptcha}</div>
  <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />

  <button on:click={handleFormLogin}>Login</button>

  <div id="g_id_onload"
       data-client_id="594127000452-k46vshbq0dtd07ak28rj0fg9s03srca7.apps.googleusercontent.com"
       data-callback="handleGoogleLogin"
       data-auto_prompt="false">
  </div>

  <div class="g_id_signin"
       data-type="standard"
       data-size="large"
       data-theme="outline"
       data-text="sign_in_with">
  </div>
</div>