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
    <h1 class="text">Industry Problem Solving</h1>
    <p>
      A partnership between learned academia and industry is designed to establish a professional platform to enable impactful
      collaboration to take on real-world challenges and build innovative solutions through intense research by participating research faculty.
      Such a professional relationship will involve expertise, resources, and technological capabilities of industry, especially MSMEs, with
      the intellectual and research-oriented knowledge from the academic world. The primary objective is to intensely drive innovation in
      product/process development. Expected outcomes from such partnerships shall include accelerated yet relevant Innovation, access to
      resources, practical application including experimentation and related data acquisition and analysis, knowledge transfer, etc.
    </p>
  </div>
</div>
