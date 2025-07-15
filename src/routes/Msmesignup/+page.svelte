<script>
  import { goto } from "$app/navigation";

  let msmename = "";
  let msmemember = "";
  let phone = "";
  let email = "";
  let password = "";
  let captchaInput = "";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();
  let isChecked = false;
  let companyType = "";

  function handleSignup() {
    if (
      msmename &&
      msmemember &&
      phone &&
      email &&
      password &&
      captchaInput === captcha &&
      companyType
    ) {
      alert("Signup Successful");
      goto("/industrysdashboard");
    } else {
      alert("Please fill all fields correctly and choose a company type.");
    }
  }

  function redirectToLogin() {
    goto("/register");
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  * {
    font-family: "Poppins", sans-serif;
  }

  .wrapper {
    min-height: 100vh;
    background: linear-gradient(to right, #f4f7fa, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 20px;
  }

  .form-container {
    width: 100%;
    max-width: 420px;
    padding: 30px 25px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    color: #003366;
    animation: fadePop 0.4s ease-in-out;
  }

  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #003366;
  }

  input,
  button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 10px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  input {
    border: 1px solid #ccc;
    background: #fff;
  }

  input:focus {
    outline: none;
    border-color: #003366;
    box-shadow: 0 0 5px rgba(0, 51, 102, 0.2);
  }

  .captcha {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.3);
    padding: 12px;
    border-radius: 10px;
    margin: 12px 0 5px;
    color: #003366;
    letter-spacing: 2px;
  }

  .checkbox-group {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  .checkbox-group label {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  button {
    background: #003366;
    color: white;
    border: none;
    font-weight: 600;
    margin-top: 18px;
    cursor: pointer;
  }

  button:hover {
    background: #005fa3;
  }

  .login-link {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 18px;
    color: #003366;
    text-decoration: underline;
    cursor: pointer;
  }

  .login-link:hover {
    color: #005fa3;
  }

  @keyframes fadePop {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

<div class="wrapper">
  <div class="form-container">
    <h2>Sign Up as MSME</h2>

    <input type="text" bind:value={msmename} placeholder="Name of MSME" />
    <input type="text" bind:value={msmemember} placeholder="MSME Number" />
    <input type="text" bind:value={phone} placeholder="Phone Number" />
    <input type="email" bind:value={email} placeholder="Email Address" />
    <input type="password" bind:value={password} placeholder="Password" />

    <div class="captcha">{captcha}</div>
    <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />

    <div class="checkbox-group">
      <label><input type="radio" bind:group={companyType} value="Micro" /> Micro</label>
      <label><input type="radio" bind:group={companyType} value="Small" /> Small</label>
      <label><input type="radio" bind:group={companyType} value="Medium" /> Medium</label>
    </div>

    <button on:click={handleSignup}>Sign Up</button>

    <div class="login-link" on:click={redirectToLogin}>
      Already have an account? Login here
    </div>
  </div>
</div>
