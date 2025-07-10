<script>
  import { goto } from "$app/navigation";

  let name = "";
  let phone = "";
  let college = "";
  let email = "";
  let password = "";
  let otp = "";
  let captchaInput = "";
  let step = "signup";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();
  let isChecked = false;

  function handleSignup() {
    if (
      name === "123" &&
      phone === "123" &&
      college === "123" &&
      email === "123@gmail.com" &&
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
    goto("/facultydashboard");
  }

  function redirectToRegister() {
    goto("/registerfaculty");
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background: linear-gradient(145deg, #e0f2ff, #ffffff);
  }

  .form-container {
    width: 100%;
    max-width: 420px;
    padding: 30px 25px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    animation: popUp 0.5s ease;
  }

  .form-container h2 {
    font-size: 1.7rem;
    text-align: center;
    margin-bottom: 20px;
    color: #003366;
    font-weight: 600;
  }

  .form-container input,
  .form-container button {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border-radius: 10px;
    font-size: 0.95rem;
  }

  input {
    border: 1px solid #ccc;
    background: #fdfdfd;
    color: #222;
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #005fa3;
    box-shadow: 0 0 5px rgba(0, 95, 163, 0.3);
  }

  .form-container button {
    background-color: #003366;
    color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form-container button:hover {
    background-color: #005fa3;
  }

  .captcha {
    font-size: 1.3rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.4);
    padding: 12px;
    border-radius: 10px;
    margin: 10px 0 5px;
    text-align: center;
    color: #003366;
    letter-spacing: 2px;
  }

  label {
    font-size: 0.9rem;
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #333;
  }

  p {
    font-size: 0.85rem;
    margin-bottom: 10px;
    line-height: 1.5;
    color: #333;
  }

  .register-link {
    color: #003366;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 12px;
  }

  .register-link:hover {
    color: #005fa3;
  }

  @keyframes popUp {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

<div class="wrapper">
  <div class="form-container">
    {#if step === "signup"}
      <h2>Sign Up</h2>
      <input type="text" bind:value={name} placeholder="Name" />
      <input type="text" bind:value={phone} placeholder="Phone" />
      <input type="text" bind:value={college} placeholder="Full College Name" />
      <input type="email" bind:value={email} placeholder="Email Address" />
      <input type="password" bind:value={password} placeholder="Password" />
      <div class="captcha">{captcha}</div>
      <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />
      <button on:click={handleSignup}>Sign Up</button>

    {:else if step === "otp"}
      <h2>Enter OTP</h2>
      <input type="text" bind:value={otp} placeholder="Enter OTP" />
      <button on:click={verifyOTP}>Verify OTP</button>

    {:else if step === "nda"}
      <h2>Non-Disclosure Agreement</h2>
      <p>
        This NDA ensures confidentiality of shared information. Please read and agree before proceeding.
      </p>
      <label>
        <input type="checkbox" bind:checked={isChecked} />
        I agree to the NDA terms
      </label>
      <button on:click={agreeAndProceed}>I Agree</button>
    {/if}

    <div class="register-link" on:click={redirectToRegister}>
      Already have an account? Click here to login
    </div>
  </div>
</div>
