<script>
  import { supabase } from "$lib/supabase";
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

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cambrian-sparkzone.com/industrysdashboard", // ✅ Redirect changed
      },
    });

    if (error) {
      console.error("Error signing in:", error.message);
    }
  }

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      goto("/studentsdashboard");
    }
  });

  function redirectToRegister() {
    goto("/register");
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<main>
  <div class="glass">
    {#if step === "signup"}
      <h1>Sign Up</h1>
      <input type="text" bind:value={name} placeholder="Name" />
      <input type="text" bind:value={phone} placeholder="Phone" />
      <input type="email" bind:value={email} placeholder="Email Address" />
      <input type="password" bind:value={password} placeholder="Password" />
      <div class="captcha">{captcha}</div>
      <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />
      <button on:click={handleSignup}>Sign Up</button>
      <div class="divider">or</div>
      <button class="google-btn" on:click={signInWithGoogle}>Sign in with Google</button>

    {:else if step === "otp"}
      <h1>Enter OTP</h1>
      <input type="text" bind:value={otp} placeholder="Enter OTP" />
      <button on:click={verifyOTP}>Verify OTP</button>
      <div class="divider">or</div>
      <button class="google-btn" on:click={signInWithGoogle}>Sign in with Google</button>

    {:else if step === "nda"}
      <h1>Non-Disclosure Agreement</h1>
      <p>This NDA ensures confidentiality of shared information. Please read and agree before proceeding.</p>
      <label>
        <input type="checkbox" bind:checked={isChecked} />
        I agree to the NDA terms
      </label>
      <button on:click={agreeAndProceed}>I Agree</button>
      <div class="divider">or</div>
      <button class="google-btn" on:click={signInWithGoogle}>Sign in with Google</button>
    {/if}

    <div class="register-link" on:click={redirectToRegister}>
      Already have an account? Click here to login
    </div>
  </div>
</main>

<style>
  * {
    font-family: "Poppins", sans-serif;
  }

  main {
    background: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .glass {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(15px);
    border-radius: 1.5rem;
    padding: 3rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
    animation: fadeInUp 0.6s ease;
    max-width: 420px;
    width: 100%;
  }

  .glass:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  h1 {
    font-size: 1.7rem;
    color: #003366;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  input,
  button {
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

  button {
    background-color: #003366;
    color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #005fa3;
  }

  .google-btn {
    background-color: #4285f4;
    color: white;
    border: none;
    font-weight: 600;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .google-btn:hover {
    background-color: #357ae8;
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

  .divider {
    margin: 1rem 0;
    font-size: 0.85rem;
    color: #999;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
