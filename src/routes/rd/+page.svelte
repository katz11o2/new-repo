<script>
  import { onMount } from 'svelte';
  let fadeIn = false;

  onMount(() => {
    fadeIn = true;
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Cinzel+Decorative:wght@700&display=swap');

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;
    box-sizing: border-box;
  }

  .container {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    padding: 30px;
    width: 100%;
    max-width: 900px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.2s ease-out, transform 1.2s ease-out, transform 0.3s ease;
    box-sizing: border-box;
  }

  .container:hover {
    transform: scale(1.01);
    box-shadow: 0 10px 40px rgba(31, 38, 135, 0.3);
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
    font-family: 'Poppins', cursive;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    color: #222;
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }

  h1:hover {
    color: #000;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #444;
    text-align: justify;
    transition: color 0.3s ease;
  }

  p:hover {
    color: #333;
  }

  @media (max-width: 600px) {
    .container {
      padding: 20px;
    }

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }

  @keyframes glow {
    0% { text-shadow: 0 0 5px #aaa; }
    50% { text-shadow: 0 0 15px #ccc; }
    100% { text-shadow: 0 0 5px #aaa; }
  }

  .glow-text {
    animation: glow 2s infinite alternate;
  }
</style>

<div class="wrapper">
  <div class="container {fadeIn ? 'fade-in' : ''}">
    <h1 class="text"> Research and Development Partnership</h1>
    <p>
      A partnership between learned academia and industry is designed to establish a professional platform to enable impactful
      Research and Development (R&D) serves as the backbone of technological advancement and societal progress. It fosters a culture of inquiry, experimentation, and continuous improvement, empowering institutions and industries to stay ahead in a rapidly evolving global landscape. By integrating theoretical frameworks with practical applications, R&D initiatives drive the creation of cutting-edge products, improved processes, and transformative solutions. Whether through academic research labs, corporate innovation centers, or public-private partnerships, the focus remains on generating knowledge, solving real-world problems, and enhancing economic and social outcomes. Sustained investment in R&D not only leads to technological breakthroughs but also cultivates a skilled workforce and a robust innovation ecosystem.
</p>
  </div>
</div>

 
