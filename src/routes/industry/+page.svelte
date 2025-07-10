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
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
    max-width: 400px;
  }

  .glass-box {
    width: 100%;
    height: 130px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(31, 38, 135, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000a30;
    font-size: 1.5rem;
    font-weight: 600;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
    text-align: center;
    padding: 0 20px;
  }

  .glass-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(31, 38, 135, 0.25);
  }
</style>

<main>
  <div class="content">
    <div class="glass-box" on:click={() => goto('/Msmesignup')}>
      For MSME
    </div>

    <div class="glass-box" on:click={() => goto('/nonmsmesignup')}>
      For Non-MSME
    </div>
  </div>
</main>
