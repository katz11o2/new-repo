




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
    font-family: 'Poppins', sans-serif;
  }

  .heading {
    font-size: 1.8rem;
    font-weight: 600;
    color: #0c1d4e;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .heading-decor {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
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
}


  .ceo-message {
    flex: 1;
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
  text-align: justify;
  font-size: 1rem;
  margin: -70px 0 0 0; /* moved text slightly up */
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
</style>

<div class="container">
  <div class="heading fade-in">Principal's Message</div>
  <div class="heading-decor fade-in">
    <div class="blue-dot"></div>
    <div class="blue-dot"></div>
    <hr class="blue-line" />
  </div>

  <div class="glass-box fade-in">
    <div class="ceo-image fade-in">
      <img src="https://engg.cambridge.edu.in/wp-content/uploads/2021/09/Principal1.png.webp" alt="Chairman Image" />
      <div class="ceo-quote">
        Dr. G. Indumathi      <br>  Principal,<br> Cambridge Institute of Technology
      </div>
    </div>
    <div class="ceo-message fade-in">
      <p>
        At Cambridge Institute of Technology, we believe in nurturing not just students,
        but future innovators, entrepreneurs, and leaders. The Cambrian Incubation
        Centre (CIC) is a testament to our commitment to creating a dynamic ecosystem
        where creativity meets opportunity. Through CIC, we aim to equip our students
        and startups with the tools, mentorship, and resources they need to transform
        their ideas into viable, impactful ventures.
        I encourage every student, faculty member, and MSME partner to actively
        engage with CIC and make the most of the opportunities it offers. Together, let’s
        build a future driven by innovation and entrepreneurship.
        
      </p>
    </div>
  </div>
</div>


