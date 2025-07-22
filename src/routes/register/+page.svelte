<script>
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation";

  let name = "";
  let phone = "";
  let college = "";
  let email = "";
  let password = "";
  
  let captchaInput = "";
  let step = "signup";
  let captcha = Math.floor(1000 + Math.random() * 9000).toString();
  let isChecked = false;

  // Manual signup simulation
  async function handleSignup() {
  if (!email || !password || !captchaInput) {
    alert("Please fill in all fields.");
    return;
  }

  if (captchaInput !== captcha) {
    alert("❌ Invalid captcha!");
    return;
  }

  // Fetch from your Supabase table (change table name if needed)
  const { data, error } = await supabase
    .from("design_ideas") // or "users" if that's your user table
    .select("*")
    .eq("email", email)
    .eq("password", password) // ❗ Not recommended in real apps — hash passwords!
    .single();

  if (error || !data) {
    alert("❌ Email or password incorrect.");
    return;
  }

  // If user found and captcha passed
  // If user found and captcha passed
goto("/facultydashboard");
 // or directly: goto("/facultydashboard");

}


 

  function agreeAndProceed() {
    if (!isChecked) {
      alert("Please agree to the terms before proceeding.");
      return;
    }
    goto("/studentsdashboard");
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cambrian-sparkzone.com/studentsdashboard",
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  }

  // Auto-redirect if already signed in
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      goto("/studentsdashboard");
    }
  });

  function redirectToRegister() {
    goto("/login");
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<main>
  <div class="glass">
    {#if step === "signup"}
      <h1>Login</h1>
     
    
      <input type="email" bind:value={email} placeholder="Email Address" />
      <input type="password" bind:value={password} placeholder="Password" />
      <div class="captcha">{captcha}</div>
      <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />
      <button on:click={handleSignup}>Continue</button>
      <div class="divider">or</div>
      <button class="google-btn" on:click={signInWithGoogle}>Continue with Google</button>

  

    {:else if step === "nda"}
      <h1>Non-Disclosure Agreement</h1>
      <p>This NDA ensures confidentiality of shared information. Please read and agree before proceeding.</p>
      <label>
        <input type="checkbox" bind:checked={isChecked} />
        I agree to the NDA terms
      </label>
      <button on:click={agreeAndProceed}>I Agree</button>
      <div class="divider">or</div>
      <button class="google-btn" on:click={signInWithGoogle}>Continue with Google</button>
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
    background: linear-gradient(to bottom right, #e6f0ff, #f0f9ff);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .glass {
    background: rgba(255, 255, 255, 0.7);
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
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  h1 {
    font-size: 1.7rem;
    color: #0066cc;
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
    border: 1px solid #aaccee;
    background: #f9fcff;
    color: #222;
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #66aaff;
    box-shadow: 0 0 5px rgba(102, 170, 255, 0.4);
  }

  button {
    background-color: #0077e6;
    color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #005bb5;
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
    font-size: 1.2rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.4);
    padding: 12px;
    border-radius: 10px;
    margin: 10px 0 5px;
    text-align: center;
    color: #004080;
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
    color: #005bb5;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 12px;
  }

  .register-link:hover {
    color: #004080;
  }

  .divider {
    margin: 1rem 0;
    font-size: 0.85rem;
    color: #777;
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
