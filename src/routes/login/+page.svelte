<script>
  import { goto } from '$app/navigation';
</script>

<style>
  .section {
    padding: 60px 20px;
    background: linear-gradient(to bottom right, #f1f5ff, #ffffff);
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section h1 {
    font-size: 2.6rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 3rem;
    text-align: center;
    letter-spacing: -0.5px;
  }

  .card-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    width: 100%;
    max-width: 1100px;
  }

  .card {
    background: rgba(255, 255, 255, 0.6);
    border: 1.5px solid rgba(30, 58, 138, 0.2);
    border-radius: 20px;
    padding: 24px 24px 14px 24px; /* reduced bottom padding */
    box-shadow: 0 12px 32px rgba(30, 58, 138, 0.08);
    backdrop-filter: blur(12px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(30, 58, 138, 0.15);
    background: rgba(255, 255, 255, 0.9);
  }

  .card h2 {
    font-size: 1.35rem;
    font-weight: 600;
    color: #1e3a8a;
    margin-bottom: 12px;
  }

  .card p {
    font-size: 1rem;
    line-height: 1.6;
    color: #2e3a59;
    padding-right: 20px;
  }

  .arrow {
    font-size: 1.4rem;
    position: absolute;
    right: 20px;
    bottom: 14px;
    color: #1e3a8a;
    transition: transform 0.2s ease;
  }

  .card:hover .arrow {
    transform: translateX(6px);
  }
</style>

<main class="section">
  <h1>Post Your Problem Statement</h1>

  <div class="card-grid">
    <div class="card" on:click={() => goto('/loginforboth')}>
      <h2>Student</h2>
      <p>
        Post a problem statement or take up an industry challenge and showcase your skills.
      </p>
      <span class="arrow">→</span>
    </div>

    <div class="card" on:click={() => goto('/facultylogin')}>
      <h2>Academicians</h2>
      <p>
        Manage problem statements, mentor student teams, and track project progress.
      </p>
      <span class="arrow">→</span>
    </div>

    <div class="card" on:click={() => goto('/industry')}>
      <h2>MSME / Non-MSME</h2>
      <p>
        Collaborate with our institution to innovate, co-create, and solve real-world problems.
      </p>
      <span class="arrow">→</span>
    </div>
  </div>
</main>
