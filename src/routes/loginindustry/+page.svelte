<script>
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";

    let email = "";
    let password = "";
    let captchaInput = "";
    let captcha = Math.floor(1000 + Math.random() * 9000).toString();

    function handleLogin() {
        if (email === "123@gmail.com" && password === "123" && captchaInput === captcha) {
            goto("/studentsdashboard");
        } else {
            alert("Invalid credentials or captcha!");
        }
    }

    function redirectToLoginForStudents() {
        goto("/industry");
    }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
    * {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding-top: 5px;
        box-sizing: border-box;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 40px;
        background: linear-gradient(145deg, #ffffff, #ffffff);
    }

    .image-container img {
        height: 520px;
        width: 380px;
        border-radius: 24px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .form-container {
        width: 400px;
        padding: 30px 30px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #003366;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .form-container h2 {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 20px;
        font-weight: 600;
    }

    .form-container input,
    .form-container button {
        width: 100%;
        padding: 12px;
        margin-top: 10px;
        border-radius: 10px;
        border: 1px solid #003366;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.4);
        color: #003366;
    }

    .form-container input:focus {
        outline: none;
        border-color: #005fa3;
        box-shadow: 0 0 8px rgba(0, 95, 163, 0.4);
    }

    .form-container button {
        background-color: #003366;
        color: white;
        font-weight: 600;
        cursor: pointer;
        margin-top: 16px;
    }

    .form-container button:hover {
        background-color: #005fa3;
    }

    .captcha {
        font-size: 1.4rem;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.35);
        padding: 12px;
        border-radius: 10px;
        margin: 16px 0 10px;
        text-align: center;
        color: #003366;
    }

    .register-link {
        color: #003366;
        text-decoration: underline;
        cursor: pointer;
        font-size: 1rem;
        text-align: center;
        margin-top: 16px;
        transition: color 0.2s ease;
    }

    .register-link:hover {
        color: #005fa3;
    }

    label {
        font-size: 0.95rem;
        margin-top: 12px;
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
        <h2>Login</h2>
        <input type="email" bind:value={email} placeholder="Enter your email ID" />
        <input type="password" bind:value={password} placeholder="Password" />
        <div class="captcha">{captcha}</div>
        <input type="text" bind:value={captchaInput} placeholder="Enter Captcha" />
        <button on:click={handleLogin}>Login</button>

        <div class="register-link" on:click={redirectToLoginForStudents}>
            Don't have an account? Create one
        </div>
    </div>
</div>
