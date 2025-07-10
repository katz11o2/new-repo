<script>
  import { goto } from "$app/navigation";

  let msmename = "";
  let phone = "";
  let email = "";
  let password = "";
  let captchaInput = "";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();
  let isChecked = false;

  function handleSignup() {
    if (msmename && phone && email && password && captchaInput === captcha) {
      alert("Signup Successful");
      goto("/industrysdashboard");
    } else {
      alert("❌ Please fill all fields correctly.");
    }
  }

  function redirectToLogin() {
    goto("/loginindustry");
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #f0f4ff, #ffffff);
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 20px;
    min-height: 100vh;
  }

  .form-container {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #003366;
  }

  h2 {
    text-align: center;
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: 0.3s;
  }

  input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    outline: none;
  }

  .captcha {
    margin-top: 20px;
    text-align: center;
    background: rgba(255, 255, 255, 0.3);
    padding: 12px;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    color: #1e3a8a;
    letter-spacing: 2px;
  }

  button {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    font-size: 1.05rem;
    border: none;
    border-radius: 10px;
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #1e40af;
  }

  .login-link {
    text-align: center;
    margin-top: 18px;
    font-size: 0.95rem;
    color: #1e40af;
    cursor: pointer;
    text-decoration: underline;
  }

  .login-link:hover {
    color: #2563eb;
  }
</style>

<div class="wrapper">
  <div class="form-container">
    <h2>Non MSME Sign Up</h2>

    <input type="text" bind:value={msmename} placeholder="Company Name" />
    <input type="text" bind:value={phone} placeholder="Phone Number" />
    <input type="email" bind:value={email} placeholder="Email Address" />
    <input type="password" bind:value={password} placeholder="Password" />

    <div class="captcha">{captcha}</div>
    <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />

    <button on:click={handleSignup}>Sign Up</button>

    <div class="login-link" on:click={redirectToLogin}>
      Already have an account? Login here
    </div>
  </div>
</div>
