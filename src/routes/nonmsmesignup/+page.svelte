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
  let canvasEl;
  let signaturePad;

 onMount(() => {
  ndaAccepted = false; // Always false on refresh
});


  // ✅ FIX: SignaturePad initializes only when canvas appears
  $: if (canvasEl && !signaturePad) {
    import('signature_pad').then(module => {
      const SignaturePad = module.default;
      signaturePad = new SignaturePad(canvasEl, {
        backgroundColor: "#fff",
        penColor: "#003366",
      });
    });
  }

  function handleSignup() {
    if (
      name === "123" &&
      phone === "123" &&
      college === "123" &&
      email === "123@gmail.com" &&
      password === "123" &&
      captchaInput === captcha
    ) {
      goto("/industrysdashboard");
    } else {
      alert("Invalid details or captcha!");
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cambrian-sparkzone.com/industrysdashboard",
      },
    });

    if (error) {
      console.error("Error signing in:", error.message);
    }
  }

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      goto("/industrysdashboard");
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


  function submitNdaAgreement() {
    if (signaturePad.isEmpty()) {
      alert("Please provide your signature.");
      return;
    }
    signature = signaturePad.toDataURL();
    ndaAccepted = true;
   
    showNdaModal = false;
  }

  function clearSignature() {
    if (signaturePad) {
      signaturePad.clear();
    }
  }

  function closeModal() {
    showNdaModal = false;
  }
</script>

<main>
  <div class="glass">
    <h1>Sign Up</h1>
    <input type="text" bind:value={name} placeholder="Name" />
    <input type="text" bind:value={phone} placeholder="Phone" />
    <input type="email" bind:value={email} placeholder="Email Address" />
    <input type="password" bind:value={password} placeholder="Password" />
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
              <div class="signature-box">
                <canvas bind:this={canvasEl} width="500" height="150"></canvas>
                <button on:click={clearSignature}>Clear Signature</button>
                <button on:click={submitNdaAgreement} class="submit-btn">Submit</button>
              </div>
            </div>
          {/if}
        </div>
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
    padding: 30px;
    flex-grow: 1;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 16px;
    font-size: 1.4rem;
    background: transparent;
    border: none;
    color: #003366;
    cursor: pointer;
    font-weight: bold;
  }

  .center-sign-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .signature-box {
    border: 2px solid #003366;
    background: white;
    padding: 16px;
    border-radius: 10px;
    text-align: center;
    max-width: 520px;
    width: 100%;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  }

  .signature-box button {
    margin-top: 10px;
    margin-right: 10px;
    background: #003366;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  .signature-box .submit-btn {
    background-color: #28a745;
  }

  .signature-box button:hover {
    opacity: 0.9;
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
    margin: 12px 0;
  }

  .nda-text {
    font-size: 0.85rem;
    color: #333;
    margin-bottom: 6px;
    text-align: left;
    width: 100%;
  }

  .view-btn {
    background-color: #984ccb;
    color: #fff;
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

  canvas {
    width: 100%;
    height: 150px;
    background: white;
    border-radius: 8px;
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
