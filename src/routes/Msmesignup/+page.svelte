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
        if (msmename && msmemember && phone && email && password && captchaInput === captcha && companyType) {
            alert("Signup Successful");
            // Proceed to next step or page
            goto("/industrysdashboard");
        } else {
            alert("Please fill all fields correctly and choose a company type.");
        }
    }

    function agreeAndProceed() {
        if (!isChecked) {
            alert("Please agree to the terms before proceeding.");
            return;
        }
        goto("/industrysdashboard");
    }
  
    function redirectToLogin() {
        goto("/loginindustry");
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
        height: 110vh;
        gap: 40px;
        background: linear-gradient(135deg, #ffffff, #ffffff);
    }

    .image-container img {
        height: 500px;
        width: 370px;
        border-radius: 20px;
    }

    .form-container {
        width: 360px;
        padding: 20px;
        margin-bottom: 8px;
        position: relative;
        top:20px;
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

    label {
        font-size: 0.9rem;
        margin-top: 10px;
    }

    .checkbox-group {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .checkbox-group label {
        font-size: 0.85rem;
        margin-top: 8px;
    }

    p {
        font-size: 0.85rem;
        margin: 10px 0;
        line-height: 1.4;
        color: #1b1b1b;
    }

    .login-link {
        font-size: 1rem;
        text-align: center;
        color: #003366;
        text-decoration: underline;
        cursor: pointer;
        margin-top: 15px;
    }

    .login-link:hover {
        color: #005fa3;
    }
</style>

<div class="wrapper">
    <!-- Image Section -->
    <div class="image-container">
        <img src="/logos/Frame 1 (1).png" alt="Header Image" />
    </div>

    <!-- Form Section -->
    <div class="form-container">
        <h2>Sign Up</h2>
        
        <input type="text" bind:value={msmename} placeholder="Name of MSME" />
        <input type="text" bind:value={msmemember} placeholder="MSME Number" />
        <input type="text" bind:value={phone} placeholder="Phone Number" />
        <input type="email" bind:value={email} placeholder="Enter your email ID" />
        <input type="password" bind:value={password} placeholder="Password" />
        
        <div class="captcha">{captcha}</div>
        <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />

        <div class="checkbox-group">
            <label>
                <input type="radio" bind:group={companyType} value="Micro" /> Micro
            </label>
            <label>
                <input type="radio" bind:group={companyType} value="Small" /> Small
            </label>
            <label>
                <input type="radio" bind:group={companyType} value="Medium" /> Medium
            </label>
        </div>

        <button on:click={handleSignup}>Sign Up</button>

        <!-- Login Link -->
        <div class="login-link" on:click={redirectToLogin}>
            Already have an account? Login here
        </div>
    </div>
</div>
