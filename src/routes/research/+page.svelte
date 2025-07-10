<script>
    import { onMount } from 'svelte';
    let fadeIn = false;
  
    onMount(() => {
      fadeIn = true;
    });
  </script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Cinzel+Decorative:wght@700&display=swap');
    
    :global(body) {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #2d1952, #7113ab, #4e0da2);
      color: white;
      font-family: 'Poppins', sans-serif;
      text-align: center;
      overflow: hidden;
    }
  
    .container {
      max-width: 900px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 1.2s ease-out, transform 1.2s ease-out;
    }
  
    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  
    h1 {
      font-size: 2rem;
      font-family: 'Cinzel Decorative', cursive;
      text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    }
  
    p {
      font-size: 1.2rem;
      line-height: 1.8;
      margin-top: 20px;
      color: rgba(255, 255, 255, 0.9);
    }
  
    @keyframes glow {
      0% { text-shadow: 0 0 5px #fff, 0 0 10px #0ff, 0 0 15px #0ff; }
      50% { text-shadow: 0 0 10px #fff, 0 0 20px #0ff, 0 0 30px #0ff; }
      100% { text-shadow: 0 0 5px #fff, 0 0 10px #0ff, 0 0 15px #0ff; }
    }
  
    .glow-text {
      animation: glow 2s infinite alternate;
    }
  </style>
  
  <div class="container {fadeIn ? 'fade-in' : ''}">
    <h1 class="glow-text">Industry-Academia Partnership</h1>
    <p>
      A partnership between learned academia and industry is designed to establish a professional platform to enable impactful
      collaboration to take on real-world challenges and build innovative solutions through intense research by participating research faculty.
      Such a professional relationship will involve expertise, resources, and technological capabilities of industry, especially MSMEs, with
      the intellectual and research-oriented knowledge from the academic world. The primary objective is to intensely drive innovation in
      product/process development. Expected outcomes from such partnerships shall include accelerated yet relevant Innovation, access to
      resources, practical application including experimentation and related data acquisition and analysis, knowledge transfer, etc.
    </p>
  </div>
  