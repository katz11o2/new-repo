<script> 
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
  main {
    font-family: 'Inter', sans-serif;
    background: #ffffff;
    min-height: 50vh;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  h1 {
    font-size: 2.3rem;
    font-weight: 600;
    color: #1e3a8a;
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease-out;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    max-width: 420px;
    animation: slideUp 0.6s ease-out;
  }

  .glass-box {
    width: 100%;
    padding: 24px 28px;
    border-radius: 16px;
    background-color: #f9fbff;
    border: 1px solid #d6e3f8;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    color: #1e3a8a;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    cursor: pointer;
  }

  .glass-box:hover {
    background-color: #eef4ff;
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<main>
  <h1>Select Your Category</h1>

  <div class="content">
    <div class="glass-box" on:click={() => goto('/loginforstudents')}>
      For CITech Student
    </div>

    <div class="glass-box" on:click={() => goto('/loginforstudents')}>
      For Non-CITech Student
    </div>
  </div>
</main>
