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
    max-width: 1200px;
    margin: auto;
    padding: 5rem 2rem;
  }

  .heading {
    font-size: 1.8rem;
    font-weight: 600;
    color: #0c1d4e;
    margin-bottom: 2rem;
    text-align: left;
  }

  .glass-box {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }

  .glass-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.3);
  }

  .ceo-image {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    opacity: 0;
    transform: translateY(20px);
    text-align: center;
  }

  .ceo-image img {
    width: 100%;
    border-radius: 0.5rem;
  }

  .ceo-quote {
    font-style: italic;
    color: #555;
    margin-top: 0.5rem;
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
    justify-content: flex-start;
    opacity: 0;
    transform: translateY(20px);
  }

  .ceo-message p {
    font-size: 1.05rem;
    margin: 0 auto;
    margin-top:20px;
    text-align: justify;
    max-width: 700px;
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

  @media (max-width: 768px) {
    .container {
      padding: 2rem;
    }

    .heading {
      text-align: center;
    }

    .glass-box {
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
    }

    .ceo-message p {
      font-size: 1rem;
    }
  }
</style>

<div class="container">
  <div class="heading fade-in">Principal's Message</div>

  <div class="glass-box fade-in">
    <div class="ceo-image fade-in">
      <img src="https://i.ibb.co/Y7CYy7Xr/Whats-App-Image-2025-08-28-at-19-40-16-f1c21c10.jpg" alt="Principal Image" />
      <div class="ceo-quote">
        Dr. B V Ravishankar <br />
        Principal,<br />
        Cambridge Institute of Technology
      </div>
    </div>
    <div class="ceo-message fade-in">
      <p>
        At Cambridge Institute of Technology, we believe in nurturing not just students, but future
        innovators, entrepreneurs, and leaders. The Cambrian Incubation Centre (CIC) is a testament
        to our commitment to creating a dynamic ecosystem where creativity meets opportunity.
        Through CIC, we aim to equip our students and startups with the tools, mentorship, and
        resources they need to transform their ideas into viable, impactful ventures.
       
        I encourage every student, faculty member, and MSME partner to actively engage with CIC and
        make the most of the opportunities it offers. Together, let’s build a future driven by
        innovation and entrepreneurship.
      </p>
    </div>
  </div>
</div>
