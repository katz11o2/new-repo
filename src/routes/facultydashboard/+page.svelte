<script>
    let email = "";

    function handleSubmit() {
        if (email.trim()) {
            alert(`Thank you! We'll notify you at: ${email}`);
            email = "";
        } else {
            alert("Please enter a valid email.");
        }
    }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
    * {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        background: linear-gradient(135deg, #dbeafe, #f0f4ff);
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        min-height: calc(100vh - 60px); /* 30px top + 30px bottom */
    }

    .container {
        width: 400px;
        padding: 30px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    h2 {
        font-size: 1.6rem;
        margin-bottom: 10px;
        color: #003366;
    }

    p {
        font-size: 0.95rem;
        color: #003366;
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid #003366;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.4);
        color: #003366;
    }

    button {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 10px;
        background-color: #003366;
        color: white;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background-color: #005fa3;
    }
</style>

<div class="wrapper">
    <div class="container">
        <h2>Hi Academician</h2>
        <p>This page is still in work. We will update you once it is done.</p>
        <input type="email" bind:value={email} placeholder="Enter your email ID" />
        <button on:click={handleSubmit}>Notify Me</button>
    </div>
</div>
