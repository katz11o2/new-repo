<script>
  import { onMount } from 'svelte';
  onMount(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.3}s`;
      el.classList.add('visible');
    });
  });

  function goToHodView() {
    window.location.href = '/hodview'; // navigate to hodview page
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
</svelte:head>

<style>
  body {
    background: #e6f0ff;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  .container {
    max-width: 1000px;
    margin: auto;
    padding: 2rem 1rem;
    font-family: 'Poppins', sans-serif;
  }

  .heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0c1d4e;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .heading-decor {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
  }

  .glass-box {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1.2rem;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 24px rgba(31, 38, 135, 0.2);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    justify-content: space-between;
    align-items: center;
  }

  .glass-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 32px rgba(31, 38, 135, 0.3);
  }

  .ceo-image {
    flex: 1;
    max-width: 220px;
    opacity: 0;
    transform: translateY(20px);
    margin: 0 auto;
    text-align: center;
  }

  .ceo-image img {
    width: 100%;
    max-width: 180px;
    border-radius: 0.5rem;
  }

  .ceo-quote {
    font-style: italic;
    color: #555;
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
  }

  .ceo-message {
    flex: 2;
    min-width: 240px;
    color: #333;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    opacity: 0;
    transform: translateY(20px);
    margin-bottom: 70px;
  }

  .ceo-message p {
    font-size: 0.95rem;
    margin: 0 auto;
    text-align: center;
    max-width: 700px;
  }

  /* Floating button */
 .hod-btn {
  position: fixed; /* ensures it's anchored to viewport, not parent */
  top: 20px;
  right: 20px;
  background: #0c1d4e;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 18px;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: background 0.3s ease;
  z-index: 999999; /* make sure it's always on top */
}


  .hod-btn:hover {
    background: #102970;
  }

  /* Animation */
  .fade-in {
    animation: fadeInUp 0.8s ease forwards;
  }

  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile Styles */
  @media (max-width: 600px) {
    .container {
      padding: 1.5rem 1rem;
    }

    .heading {
      font-size: 1.25rem;
      text-align: center;
    }

    .glass-box {
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
      text-align: center;
    }

    .ceo-image {
      max-width: 160px;
    }

    .ceo-image img {
      max-width: 150px;
    }

    .ceo-message p {
      font-size: 0.9rem;
    }

    .ceo-quote {
      font-size: 0.85rem;
    }
  }
</style>

<div class="container">
  <div class="heading fade-in">CEO's Message</div>
  <div class="heading-decor fade-in">
    <div class="blue-dot"></div>
    <div class="blue-dot"></div>
    <hr class="blue-line" />
  </div>

  <div class="glass-box fade-in">
    <div class="ceo-image fade-in">
      <img src="https://engg.cambridge.edu.in/wp-content/uploads/2021/07/ceo-1-788x1024-1.jpg.webp" alt="Chairman Image" />
      <div class="ceo-quote">
        Shri. Nithin Mohan<br />
        Chief Executive Officer,<br> Cambridge Institute of Technology
      </div>
    </div>
    <div class="ceo-message fade-in">
      <p>
        CIC is more than an incubation centre – it is a launchpad for visionaries. We believe in creating
        an ecosystem where innovation thrives and startups flourish with the right support, mentorship,
        and infrastructure. Our partnerships with academia and industry ensure that our incubatees are
        always future-ready.
      </p>
    </div>
  </div>
</div>

<!-- Floating Button (now inside Svelte scope) -->
<button class="hod-btn" on:click={goToHodView}>Go to HOD View</button>
