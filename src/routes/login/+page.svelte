<script>
  import { goto } from '$app/navigation';
</script>

<style>
  .section {
    padding: 60px 20px 180px 20px;
    background: linear-gradient(to bottom right, #f1f5ff, #ffffff);
    font-family: 'Poppins', sans-serif;
    min-height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    animation: fadeIn 1s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .admin-box {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #1e3a8a;
    color: white;
    padding: 8px 14px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: background-color 0.3s, transform 0.3s ease;
  }

  .admin-box:hover {
    background-color: #334bb8;
    transform: scale(1.05);
  }

  .section h1 {
    font-size: 2.6rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 3rem;
    text-align: center;
    letter-spacing: -0.5px;
    animation: slideIn 1s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
    padding: 24px 24px 14px 24px;
    box-shadow: 0 12px 32px rgba(30, 58, 138, 0.08);
    backdrop-filter: blur(12px);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    animation: zoomIn 0.8s ease;
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
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
    transition: color 0.3s ease;
  }

  .card:hover h2 {
    color: #334bb8;
  }

  .card p {
    font-size: 1rem;
    line-height: 1.6;
    color: #2e3a59;
    padding-right: 20px;
    transition: color 0.3s ease;
  }

  .card:hover p {
    color: #1e2a47;
  }

  .arrow {
    font-size: 1.4rem;
    position: absolute;
    right: 20px;
    bottom: 14px;
    color: #1e3a8a;
    transition: transform 0.2s ease, color 0.3s ease;
  }

  .card:hover .arrow {
    transform: translateX(6px);
    color: #334bb8;
  }
</style>

<main class="section">
  <!-- ✅ Admin Button -->
  <div class="admin-box" on:click={() => goto('/adminpage')}>
    Admin
  </div>

  <h1>Post Your Problem Statement</h1>

  <div class="card-grid">
    <div class="card" on:click={() => goto('/loginforbothstudent')}>
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

    <div class="card" on:click={() => goto('/loginforboth')}>
      <h2>MSME / Non-MSME</h2>
      <p>
        Collaborate with our institution to innovate, co-create, and solve real-world problems.
      </p>
      <span class="arrow">→</span>
    </div>
  </div>
</main>
