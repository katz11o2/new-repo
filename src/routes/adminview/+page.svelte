<script> 
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
  main {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f0f4ff, #ffffff);
    min-height: 80vh;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #1e3a8a;
    margin-bottom: 30px;
    text-align: center;
    animation: fadePop 0.6s ease-in-out;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    max-width: 400px;
    animation: fadePop 0.6s ease-in-out;
  }

  .glass-box {
    width: 100%;
    min-height: 50px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.08);
    border: 1px solid #d6e3f8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1e3a8a;
    font-size: 1.2rem;
    font-weight: 600;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    cursor: pointer;
    padding: 20px;
    text-align: center;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  .glass-box:hover {
    transform: translateY(-4px);
    background: #f0f6ff;
    box-shadow: 0 12px 28px rgba(30, 58, 138, 0.15);
  }

  @keyframes fadePop {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Mobile Optimizations */
  @media (max-width: 480px) {
    .glass-box {
      font-size: 1rem;
      padding: 16px;
    }

    h1 {
      font-size: 1.6rem;
    }
  }
</style>

<main>
  <h1>Select Your Category</h1>

  <div class="content">
    <div class="glass-box" on:click={() => goto('/adminpage')}>
      For CEO
    </div>

    <div class="glass-box" on:click={() => goto('/adminpage2')}>
      For CIC Head/ Manager
    </div>
  </div>
</main>
