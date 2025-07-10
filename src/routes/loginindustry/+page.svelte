<script>
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let captchaInput = "";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();

  function handleLogin() {
    if (email === "123@gmail.com" && password === "123" && captchaInput === captcha) {
      goto("/industrysdashboard");
    } else {
      alert("Invalid credentials or captcha!");
    }
  }

  function redirectToLoginForStudents() {
    goto("/industry");
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
  * {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    box-sizing: border-box;
  }

  .wrapper {
    min-height: 100vh;
    background: linear-gradient(to top right, #ecf0f3, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .form-container {
    max-width: 400px;
    width: 100%;
    padding: 32px 28px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation: popIn 0.4s ease-in-out;
  }

  h2 {
    font-size: 1.8rem;
    text-align: center;
    color: #003366;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  input,
  button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    font-size: 0.95rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: rgba(255, 255, 255, 0.7);
    color: #003366;
    transition: all 0.3s ease;
  }

  input:focus {
    outline: none;
    border-color: #003366;
    box-shadow: 0 0 6px rgba(0, 51, 102, 0.2);
  }

  .captcha {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    background: rgba(255, 255, 255, 0.4);
    padding: 10px;
    border-radius: 10px;
    margin: 16px 0 8px;
    text-align: center;
    color: #003366;
  }

  button {
    background-color: #003366;
    color: white;
    font-weight: 600;
    margin-top: 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: #005fa3;
  }

  .register-link {
    margin-top: 16px;
    text-align: center;
    font-size: 0.95rem;
    color: #003366;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .register-link:hover {
    color: #005fa3;
  }

  @keyframes popIn {
    from {
      transform: scale(0.97);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>

<div class="wrapper">
  <div class="form-container">
    <h2>Login</h2>
    <input type="email" bind:value={email} placeholder="Enter your email ID" />
    <input type="password" bind:value={password} placeholder="Password" />
    <div class="captcha">{captcha}</div>
    <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />
    <button on:click={handleLogin}>Login</button>

    <div class="register-link" on:click={redirectToLoginForStudents}>
      Don't have an account? Create one
    </div>
  </div>
</div>
