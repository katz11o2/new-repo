<script>
  import { goto } from "$app/navigation";

  let username = "";
  let password = "";

  function handleLogin() {
    if (username === "123" && password === "123") {
      goto("/view"); // Redirect to /view on successful login
    } else {
      alert("Invalid credentials!");
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

  .form-container {
    width: 340px;
    padding: 25px 30px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #1e3a8a;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 12px;
    border-radius: 10px;
    border: 1px solid #1e3a8a;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
  }

  button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    background-color: #1e3a8a;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #365dc9;
  }
</style>

<div class="wrapper">
  <div class="form-container">
    <h2>Welcome Admin Login</h2>
    <input type="text" placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={handleLogin}>Login</button>
  </div>
</div>
