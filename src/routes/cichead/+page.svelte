<script>
  import { onMount } from 'svelte';
  onMount(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.3}s`;
      el.classList.add('visible');
    });
  });
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
    max-width: 1100px;
    margin: auto;
    padding: 4rem 2rem;
  }

  .heading {
    font-size: 2rem;
    font-weight: 600;
    color: #0c1d4e;
    margin-bottom: 0.75rem;
    text-align: left;
  }

  .heading-decor {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 2rem;
  }

  .glass-box {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    justify-content: space-between;
    align-items: center;
  }

  .glass-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 36px rgba(31, 38, 135, 0.3);
  }

  .ceo-image {
    flex: 1;
    max-width: 260px;
    opacity: 0;
    transform: translateY(20px);
    text-align: center;
  }

  .ceo-image img {
    width: 100%;
    max-width: 220px;
    border-radius: 0.75rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .ceo-quote {
    font-style: italic;
    color: #555;
    margin-top: 0.75rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }

  .ceo-message {
    flex: 2;
    min-width: 300px;
    color: #333;
    line-height: 1.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px);
  }

  .ceo-message p {
    font-size: 1.1rem;
    margin: 0 auto;
    text-align: justify;
    margin-bottom: 70px;
    max-width: 700px;
  }

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

  @media (max-width: 600px) {
    .container {
      padding: 2rem 1rem;
    }

    .heading {
      font-size: 1.5rem;
      text-align: center;
    }

    .glass-box {
      flex-direction: column;
      gap: 2rem;
      padding: 1.5rem;
      text-align: center;
    }

    .ceo-image {
      max-width: 180px;
    }

    .ceo-image img {
      max-width: 160px;
    }

    .ceo-quote {
      font-size: 0.95rem;
    }

    .ceo-message p {
      font-size: 1rem;
    }
  }
</style>

<div class="container">
  <div class="heading fade-in">Head – CIC's Message</div>
  <div class="heading-decor fade-in">
    <div class="blue-dot"></div>
    <div class="blue-dot"></div>
    <hr class="blue-line" />
  </div>

  <div class="glass-box fade-in">
    <div class="ceo-image fade-in">
      <img src="https://engg.cambridge.edu.in/wp-content/uploads/2023/06/536e21ff-2f83-4f7f-8cfb-f3707a562081.jpg" alt="Dr. Varalatchoumy M" />
      <div class="ceo-quote">
        Dr. Varalatchoumy M<br>
        Head, Cambrian Incubation Centre
      </div>
    </div>

    <div class="ceo-message fade-in">
      <p>
        The Cambrian Incubation Centre is designed to be a space for ideation, collaboration, and transformation. With support from the Ministry of MSME and IISc Bangalore, we aim to bridge the gap between research and real-world implementation. Whether you're a student, MSME, or innovator, CIC is here to help you scale your ideas.
      </p>
    </div>
  </div>
</div>
