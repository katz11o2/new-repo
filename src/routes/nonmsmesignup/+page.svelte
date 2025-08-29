  <script>
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let Name = "";
    let phone = "";
    let college = "";
    let Email = "";
    let password = "";
    let confirmPassword = "";

    let captchaInput = "";
    let captcha = Math.floor(1000 + Math.random() * 9000).toString();

    let showNdaModal = false;
    let ndaAccepted = false;
    let ndaScrolledToEnd = false;
    

  onMount(() => {
    ndaAccepted = false; // Always false on refresh
  });


    // ✅ FIX: SignaturePad initializes only when canvas appears
  

   async function handleSignup() {
  const nameRegex = /^[A-Za-z. ]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?![!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8}$/;

  if (!nameRegex.test(Name)) {
    alert("❌ Name should contain only letters, spaces, or dots.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("❌ Phone number must be exactly 10 digits.");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("❌ Password must be 8 characters and cannot start with a special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Passwords do not match.");
    return;
  }

  if (captchaInput !== captcha) {
    alert("❌ Incorrect captcha.");
    return;
  }

  if (!ndaAccepted) {
    alert("❌ Please accept the NDA.");
    return;
  }

  // ✅ Use Supabase Auth signup instead of table insert
  const { data, error } = await supabase.auth.signUp({
    email: Email,
    password: password,
    options: {
      data: { 
        name: Name,
        phone: phone,
        college: college
      },
      emailRedirectTo: "https://cambrian-sparkzone.com/studentsdashboard" // redirect after confirmation
    }
  });

  if (error) {
    alert("❌ Sign-up failed: " + error.message);
    console.error("Supabase error:", error);
    return;
  }

  alert("✅ Signed up successfully! Please check your email to confirm.");
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
    console.error("Error signing in:", error.message);
  }
}


   supabase.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    goto("/studentsdashboard");
  }
});


    function redirectToRegister() {
      goto("/register");
    }

    function handleNdaScroll(event) {
    const element = event.target;
    if (!ndaScrolledToEnd) {
      const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 10;
      if (atBottom) {
        ndaScrolledToEnd = true;
      }
    }
  }

  function acceptNda() {
    if (!ndaScrolledToEnd) {
      alert("Please scroll to the bottom before accepting.");
      return;
    }
    ndaAccepted = true;
    showNdaModal = false;
  }

    
    
    

    function closeModal() {
      showNdaModal = false;
    }
  </script>

  <main>
    <div class="glass">
      <h1>Register/Sign Up</h1>
      <input type="text" bind:value={Name} placeholder="Name" />
      <input type="text" bind:value={phone} placeholder="Phone" />
      <input type="text" bind:value={college} placeholder="GST Number" />
    <input type="email" bind:value={Email} placeholder="Email Address" />
    <!-- ✅ Password field with instruction + error -->
<input type="password" bind:value={password} placeholder="Password" />

<!-- Instruction always visible -->
<p style="font-size: 12px; color: #666; text-align: left; margin: 4px 0 0 4px;">
  *Must be exactly 8 characters <br> *Must Include one special character <br> *Must not start with Special Character.
</p>

<!-- Error shown only when typed but invalid -->
{#if password && !/^(?![!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8}$/.test(password)}
  <p style="font-size: 12px; color: red; text-align: left; margin: 4px 0 0 4px;">
    ❌ Invalid password format.
  </p>
{/if}

      <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" />

      <div class="captcha">{captcha}</div>
      <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />

      {#if !ndaAccepted}
        <div class="nda-section">
          <div class="nda-text">I have read and agree to the non-disclosure document</div>
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
        <div class="nda-content-wrapper">
          <div class="nda-content" on:scroll={handleNdaScroll}>
            <button class="close-btn" on:click={closeModal}>✕</button>
            <h2>Non-Disclosure Agreement</h2>
            <p>
    GENERAL PRELIMINARY NDA AT IDEA-PROPOSAL SUBMISSION STAGE. <br> <br>
  1.	General Submission Stage NDA:
  Non-Disclosure Agreement (NDA) between Idea Proposer (Problem &/or Design) (includes Student(s) / Faculty / MSMEs / Non-MSMEs / Start-Ups / Individuals / Others, etc.) AND Cambridge Institute of Technology (full address).
  <br><br>2.	Purpose: 
  The Idea-Proposer intends to share certain confidential and proprietary information related to a business idea or concept ("Confidential Information") with the Cambridge Institute of Technology, Bangalore for the purpose of considering to develop a possible solution which may also include a new product development (NPD) through intense discussion, frequent evaluation and potential collaboration amongst all stake holders.
  <br><br> 3.	Confidential Information:
  Confidential Information includes, but is not limited to, technical data, plans, inventions, business strategies, and any other information disclosed in oral, written, or electronic form that is mutually identified as confidential at the time of disclosure.
  <br><br> 4.	Obligations of the Cambridge Institute of Technology, Bangalore:
  The Cambridge Institute of Technology, Bangalore agrees to:
  <br>a.	Maintain the confidentiality of the Confidential Information;
  <br>b.	Not disclose it to any third party without written consent of the Idea-Proposer;
  <br>c.	Use the Confidential Information solely for the purpose stated above.
  <br><br>5.	Exclusions:
  Confidential Information does not include information that:
  <br>a.	Was already known to the Cambridge Institute of Technology, Bangalore at the time of disclosure;
  <br>b.	Becomes publicly available through no fault of the Cambridge Institute of Technology, Bangalore;
  <br>c.	Is disclosed to the Cambridge Institute of Technology, Bangalore by a Third party legally entitled to do so.

  <br><br>6.	Term of this NDA: 
  This preliminary NDA shall remain in effect for a period of two (2) years from the date of submission of idea/problem (on-line/off-line) as Confidential Information.
  <br><br>7.	No License or Obligation: 
  This Agreement does not grant any license or rights to the Cambridge Institute of Technology, Bangalore under any patent, copyright, or other intellectual property. It also does not obligate either party to enter into any further agreement or business relationship.
  <br><br>8.	Governing Laws: 
  This Agreement shall be governed by and construed in accordance with the relevant laws of the Karnataka State and Union of India.  
  <br><br>9.	Status of Agreement :
  By accepting the ‘NDA’ it means that idea-proposer has accepted the aforesaid terms and agreed to this NDA by signing the same.
















    
  </p>


            {#if ndaScrolledToEnd}
    <div class="center-sign-box">
      <label style="display: flex; align-items: center; gap: 10px; font-weight: 500;">
        <input type="checkbox" bind:checked={ndaAccepted} />
        I agree to the terms of the NDA
      </label>
                <button on:click={acceptNda} class="submit-btn" style="margin-top: 12px;">Confirm</button>
              </div>
            {/if}

          </div> <!-- close nda-content -->
        </div> <!-- close nda-content-wrapper -->
      </div> <!-- close nda-modal -->
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
    padding: 20px 10px;
    position: relative;
  }

  .glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  border-radius: 1rem;
  padding: 1.5rem 1.5rem; /* Increased padding for equal spacing */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeInUp 0.6s ease;
  max-width: 320px; /* slightly wider */
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
}

  .glass:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  h1 {
    font-size: 1rem;
    color: #003366;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  input,
button {
  width: 100%;
  max-width: 260px; /* keeps fields centered with padding on sides */
  padding: 6px 10px;
  margin: 5px 0;
  border-radius: 4px;
  font-size: 0.75rem;
  box-sizing: border-box;
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
    font-size: 0.75rem;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .google-btn:hover {
    background-color: #357ae8;
  }

  .captcha {
    font-size: 0.85rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.4);
    padding: 5px;
    border-radius: 8px;
    margin: 8px 0 4px;
    text-align: center;
    color: #003366;
    letter-spacing: 2px;
  }

  p,
  .nda-text {
    font-size: 0.7rem;
    margin: 2px 0;
    line-height: 1.3;
    text-align: left;
  }

  .divider {
    margin: 0.75rem 0;
    font-size: 0.75rem;
    color: #999;
  }

  .register-link {
    color: #003366;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.75rem;
    text-align: center;
    margin-top: 10px;
  }

  .register-link:hover {
    color: #005fa3;
  }

  .nda-section {
    margin: 8px 0;
  }

  .view-btn {
    background-color: #984ccb;
    color: #fff;
    font-size: 0.7rem;
    padding: 5px;
    border-radius: 6px;
  }

  .nda-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 0;
  }

  .nda-content-wrapper {
    width: 100%;
    max-width: 640px;
    max-height: 85vh;
    background: #fff;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .nda-content {
    overflow-y: auto;
    padding: 16px;
    flex-grow: 1;
  }

  .nda-content h2 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #003366;
  }

  .nda-content p {
    font-size: 0.7rem;
    color: #222;
    line-height: 1.6;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 16px;
    font-size: 1.2rem;
    background: transparent;
    border: none;
    color: #003366;
    cursor: pointer;
    font-weight: bold;
  }

  .center-sign-box {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .submit-btn {
    font-size: 0.75rem;
    padding: 5px 8px;
    border-radius: 6px;
  }

  canvas {
    width: 100%;
    height: 120px;
    background: white;
    border-radius: 6px;
    border: 1px solid #ccc;
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

