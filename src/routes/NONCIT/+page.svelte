<script>
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";

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
        if (name === "123" && phone === "123" && college === "123" && email === "123@gmail.com" && password === "123" && captchaInput === captcha) {
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
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
    * {
        font-family: 'Poppins', sans-serif;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 40px;
        background: linear-gradient(135deg, #ffffff, #ffffff);
    }

    .image-container img {
        height: 500px;
        width: 370px;
    }

    .form-container {
        width: 360px;
        padding: 5px 20px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #003366;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .form-container h2 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .form-container input,
    .form-container button {
        width: 100%;
        padding: 8px;
        margin-top: 6px;
        border-radius: 8px;
        border: 1px solid #003366;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }

    .form-container input:focus {
        outline: none;
        border-color: #005fa3;
        box-shadow: 0 0 5px rgba(0, 95, 163, 0.3);
    }

    .form-container button {
        background-color: #003366;
        color: white;
        font-weight: 500;
        cursor: pointer;
        margin-top: 10px;
    }

    .form-container button:hover {
        background-color: #005fa3;
    }

    .captcha {
        font-size: 1.2rem;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.3);
        padding: 10px;
        border-radius: 8px;
        margin: 10px 0 5px;
        text-align: center;
        color: #003366;
    }

    .register-link {
        color: #003366;
        text-decoration: underline;
        cursor: pointer;
        font-size: 0.95rem;
        text-align: center;
        margin-top: 10px;
        transition: color 0.2s ease;
    }

    .register-link:hover {
        color: #005fa3;
    }

    label {
        font-size: 0.9rem;
        margin-top: 10px;
    }

    p {
        font-size: 0.85rem;
        margin: 10px 0;
        line-height: 1.4;
        color: #1b1b1b;
    }
</style>

<div class="wrapper">
    <!-- Image Section -->
    <div class="image-container">
        <img src="/logos/Frame 1 (1).png" alt="Header Image" />
    </div>

    <!-- Form Section -->
    <div class="form-container">
        {#if step === "signup"}
            <h2>Sign Up</h2>
            <input type="text" bind:value={name} placeholder="Name" />
            <input type="text" bind:value={phone} placeholder="Phone" />
            <input type="text" bind:value={college} placeholder="Full College Name" />
            <input type="email" bind:value={email} placeholder="Enter your email ID" />
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
            <p>This NDA ensures the confidentiality of the shared information. Please read and agree below.</p>
            <label>
                <input type="checkbox" bind:checked={isChecked} /> I agree to the NDA terms
            </label>
            <button on:click={agreeAndProceed}>I Agree</button>
        {/if}

        <div class="register-link" on:click={redirectToRegister}>
            Click here to login
        </div>
    </div>
</div>
