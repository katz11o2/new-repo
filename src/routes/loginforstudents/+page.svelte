<script>
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let name = "";
  let phone = "";
  let college = "";
  let email = "";
  let password = "";
  let captchaInput = "";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();

  let showNdaModal = false;
  let ndaAccepted = false;
  let ndaScrolledToEnd = false;
  let signature = "";

  onMount(() => {
    ndaAccepted = localStorage.getItem("ndaAccepted") === "true";
  });

  function handleSignup() {
    if (
      name === "123" &&
      phone === "123" &&
      college === "123" &&
      email === "123@gmail.com" &&
      password === "123" &&
      captchaInput === captcha
    ) {
      goto("/facultydashboard");
    } else {
      alert("Invalid details or captcha!");
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cambrian-sparkzone.com/studentsdashboard",
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

  function handleNdaScroll(event) {
    const element = event.target;
    ndaScrolledToEnd = element.scrollTop + element.clientHeight >= element.scrollHeight - 10;
  }

  function submitNdaAgreement() {
    if (signature.trim() === "") {
      alert("Please provide your signature.");
      return;
    }
    ndaAccepted = true;
    localStorage.setItem("ndaAccepted", "true");
    showNdaModal = false;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<main>
  <div class="glass">
    <h1>Sign Up</h1>
    <input type="text" bind:value={name} placeholder="Name" />
    <input type="text" bind:value={phone} placeholder="Phone" />
    <input type="text" bind:value={college} placeholder="Full College Name" />
    <input type="email" bind:value={email} placeholder="Email Address" />
    <input type="password" bind:value={password} placeholder="Password" />
    <div class="captcha">{captcha}</div>
    <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />

   {#if !ndaAccepted}
  <div class="nda-section">
    <label>
      <input type="checkbox" disabled checked />
      I have read and agree to the non-disclosure document
    </label>
    <button class="view-btn" on:click={() => (showNdaModal = true)}>View & Agree</button>
  </div>
{/if}


    <button on:click={handleSignup}>Sign Up</button>
    <div class="divider">or</div>
    <button class="google-btn" on:click={signInWithGoogle}>Sign in with Google</button>

    <div class="register-link" on:click={redirectToRegister}>
      Already have an account? Click here to login
    </div>
  </div>

  {#if showNdaModal}
    <div class="nda-modal">
      <div class="nda-content" on:scroll={handleNdaScroll}>
        <h2>Non-Disclosure Agreement</h2>
        <p>
          This NDA is a legal agreement between you and the organization. It outlines that you will not share any
          confidential or sensitive information with outside parties, and you agree to protect all proprietary
          materials shared with you during your participation...
          <br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non augue sit amet leo
          fermentum accumsan. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam...
          <br /><br />[Add more content if needed for scrolling]
        </p>
        {#if ndaScrolledToEnd}
          <div class="nda-sign">
            <input type="text" bind:value={signature} placeholder="Enter your signature" />
            <button on:click={submitNdaAgreement}>Submit</button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
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
    position: relative;
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
    z-index: 1;
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

  .nda-section {
    text-align: left;
    font-size: 0.85rem;
    margin: 12px 0;
  }

  .nda-section label {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #333;
  }

  .view-btn {
    background-color: #888;
    color: #fff;
    margin-top: 6px;
  }

  .nda-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 20px;
  }

  .nda-content {
    background: white;
    max-height: 70vh;
    width: 100%;
    max-width: 600px;
    padding: 20px;
    overflow-y: auto;
    border-radius: 12px;
    text-align: left;
    position: relative;
  }

  .nda-content h2 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #003366;
  }

  .nda-content p {
    font-size: 0.9rem;
    color: #222;
    line-height: 1.6;
  }

  .nda-sign {
    margin-top: 20px;
  }

  .nda-sign input {
    margin-bottom: 10px;
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
