<script>
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabase";

  let username = "";
  let password = "";
  let newUsername = "";
  let newPassword = "";

  let isRegistering = false;

 async function handleLogin() {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (trimmedUsername === "123" && trimmedPassword === "123") {
    isRegistering = true;
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", trimmedUsername)
    .eq("password", trimmedPassword)
    .single();

  if (data) {
    goto("/view");
  } else {
    alert("Invalid credentials!");
  }
}


 async function handleRegister() {
  const trimmedUsername = newUsername.trim();
  const trimmedPassword = newPassword.trim();

  if (!trimmedUsername || !trimmedPassword) {
    alert("Both fields are required.");
    return;
  }

  const { count } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (count >= 4) {
    alert("Maximum of 4 users already registered.");
    return;
  }

  const { error } = await supabase
    .from("users")
    .insert([{ username: trimmedUsername, password: trimmedPassword }]);

  if (error) {
    alert("Error creating user.");
  } else {
    alert("User created! Please login now.");
    isRegistering = false;
    username = trimmedUsername;
    password = trimmedPassword;
  }
}

</script>

<svelte:head>
  <title>Welcome Admin Login</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
  * {
    font-family: 'Poppins', sans-serif;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #ffffff, #e0eaff);
  }

  .field {
  margin: 8px 0;
  padding: 0 6px; /* Equal padding from left and right */
}

  .form-container {
    width: 320px;
    padding: 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 16px;
    color: #1e3a8a;
  }

  input {
    width: 100%;
    padding: 6px 5px;
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid #1e3a8a;
    font-size: 0.9rem;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 4px rgba(59, 130, 246, 0.3);
  }

  button {
    margin-top: 14px;
    padding: 8px;
    width: 100%;
    background-color: #1e3a8a;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  button:hover {
    background-color: #365dc9;
  }

  .password-rules {
    margin-top: 8px;
    text-align: left;
    font-size: 0.7rem;
    color: #444;
    line-height: 1.4;
  }
</style>


<div class="wrapper">
  <div class="form-container">
  {#if isRegistering}
    <h2>Set Your Credentials</h2>
    <div class="field"><input type="text" placeholder="New Username" bind:value={newUsername} /></div>
    <div class="field"><input type="password" placeholder="New Password" bind:value={newPassword} /></div>
    <div class="password-rules">
      * Must be exactly 8 characters<br />
      * Must include one special character<br />
      * Must not start with a special character.
    </div>
    <div class="field"><button on:click={handleRegister}>Register</button></div>
  {:else}
    <h2>Welcome Admin Login</h2>
    <div class="field"><input type="text" placeholder="Username" bind:value={username} /></div>
    <div class="field"><input type="password" placeholder="Password" bind:value={password} /></div>
    <div class="field"><button on:click={handleLogin}>Login</button></div>
  {/if}
</div>

</div>
