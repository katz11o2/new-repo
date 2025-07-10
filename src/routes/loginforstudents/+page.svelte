<script>
  import { goto } from "$app/navigation";

  let name = "";
  let phone = "";
  let email = "";
  let password = "";
  let otp = "";
  let captchaInput = "";
  let step = "signup";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();
  let isChecked = false;

  function handleSignup() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@cambridge\.edu\.in$/;
    if (!emailPattern.test(email)) {
      alert("Please enter your official college email ID");
      return;
    }

    if (
      name === "123" &&
      phone === "123" &&
      email === "123@cambridge.edu.in" &&
      password === "123" &&
      captchaInput === captcha
    ) {
      step = "otp";
    } else {
      alert("Invalid details or captcha!");
    }
  }

  function verifyOTP() {
    if (otp === "123") {
      step = "nda";
    } else {
      alert("Invalid OTP!");
    }
  }

  function agreeAndProceed() {
    if (!isChecked) {
      alert("Please agree to the terms before proceeding.");
      return;
    }
    goto("/studentsdashboard");
  }

  function redirectToRegister() {
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
    font-family: 'Poppins', sans-serif;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to bottom right, #f8fafc, #ffffff);
    padding: 2rem;
  }

  .form-container {
    width: 100%;
    max-width: 420px;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
  }

  .form-container h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
    color: #1e3a8a;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1.5px solid #cbd5e1;
    background: #f9fafb;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #1e3a8a;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }

  .captcha {
    font-size: 1.3rem;
    font-weight: 600;
    background: #f1f5f9;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 12px;
  }

  button {
    width: 100%;
    background-color: #1e3a8a;
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-weight: 600;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 8px;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #294faa;
  }

  label {
    font-size: 0.95rem;
    margin-top: 14px;
    display: block;
  }

  input[type="checkbox"] {
    margin-right: 8px;
  }

  p {
    font-size: 0.9rem;
    margin: 1rem 0;
    color: #475569;
    line-height: 1.4;
  }

  .register-link {
    text-align: center;
    color: #1e3a8a;
    margin-top: 18px;
    font-size: 0.95rem;
    cursor: pointer;
    text-decoration: underline;
  }

  .register-link:hover {
    color: #3b63c6;
  }
</style>

<div class="wrapper">
  <div class="form-container">
    {#if step === "signup"}
      <h2>Sign Up</h2>
      <input type="text" bind:value={name} placeholder="Name" />
      <input type="text" bind:value={phone} placeholder="Phone" />
      <input type="email" bind:value={email} placeholder="Official College Email ID" />
      <input type="password" bind:value={password} placeholder="Password" />
      <div class="captcha">{captcha}</div>
      <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />
      <button on:click={handleSignup}>Sign Up</button>

    {:else if step === "otp"}
      <h2>Verify OTP</h2>
      <input type="text" bind:value={otp} placeholder="Enter OTP" />
      <button on:click={verifyOTP}>Verify</button>

    {:else if step === "nda"}
      <h2>Non-Disclosure Agreement</h2>
      <p>
        This NDA ensures the confidentiality of the shared information. Please read and agree below.
      </p>
      <label>
        <input type="checkbox" bind:checked={isChecked} />
        I agree to the NDA terms
      </label>
      <button on:click={agreeAndProceed}>I Agree</button>
    {/if}

    <div class="register-link" on:click={redirectToRegister}>
      Click here to login
    </div>
  </div>
</div>
