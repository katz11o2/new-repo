<script>
  let username = '';
  let password = '';
  let isLoggedIn = false;

  const validUsername = import.meta.env.VITE_USERNAME;
  const validPassword = import.meta.env.VITE_PASSWORD;

  function login() {
    if (username === validUsername && password === validPassword) {
      isLoggedIn = true;
    } else {
      alert('Access Denied!');
    }
  }
</script>

{#if !isLoggedIn}
  <div class="login-form">
    <h2>Login Required</h2>
    <input bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={login}>Login</button>
  </div>
{:else}
  <div class="real-content">
    <h1>Welcome, Teacher!</h1>
    <p>This is the real content of your Svelte project.</p>
    <!-- Your full site starts here -->
  </div>
{/if}
