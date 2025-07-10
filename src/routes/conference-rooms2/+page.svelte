<script>
    const images = [
      'https://i.postimg.cc/YS2mcPYB/Whats-App-Image-2025-04-24-at-13-15-36-11eb078f.jpg',
      'https://i.postimg.cc/Yq4GMgvj/Whats-App-Image-2025-04-24-at-13-14-28-f5789805.jpg'
]
  </script>
  
  <style>
    .page {
      background: white;
      min-height: 100vh;
      padding: 4rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .greeting {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeIn 1s ease-in-out;
    }
  
    .header h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
  
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .gap-3 {
      gap: 0.75rem;
    }
  
    .w-2 { width: 0.5rem; }
    .h-2 { height: 0.5rem; }
    .bg-blue-900 { background-color: #1e3a8a; }
    .rounded-full { border-radius: 9999px; }
    .w-\[60px\] { width: 60px; }
    .h-0\.5 { height: 2px; }
    .ml-2 { margin-left: 0.5rem; }
  
    .image-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 1000px;
      margin-bottom: 2.5rem;
      animation: fadeIn 1.2s ease-in-out;
    }
  
    .card {
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
  
    .card:hover {
      transform: translateY(-8px);
      box-shadow: 0 14px 48px rgba(0, 0, 0, 0.15);
    }
  
    .card img {
      width: 100%;
      height: 280px;
      object-fit: cover;
    }
  
    .description {
      text-align: center;
      max-width: 800px;
      font-size: 1.15rem;
      font-weight: 500;
      line-height: 1.7;
      color: #333;
      padding: 0 1rem;
      animation: fadeIn 1.5s ease-in-out;
    }
  
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  
    @media (max-width: 768px) {
      .image-grid {
        grid-template-columns: 1fr;
      }
      .card img {
        height: 220px;
      }
      .description {
        font-size: 1rem;
      }
    }
  </style>
  
  <div class="page">
    <div class="greeting">
      <div class="header">
        <h2>Seminar Hall 2</h2>
        <div class="flex items-center gap-3 mt-2 mb-1">
          <span class="w-2 h-2 bg-blue-900 rounded-full"></span>
          <span class="w-2 h-2 bg-blue-900 rounded-full"></span>
          <div class="w-[150px] h-0.5 bg-blue-900 ml-2"></div>
        </div>
      </div>
    </div>
  
    <div class="image-grid">
      {#each images as img}
        <div class="card">
          <img src={img} alt="Gallery image" />
        </div>
      {/each}
    </div>
  
    <div class="description">
      <p>
        Meet our Points of Contact who guide and inspire.<br />
        Empowering innovation, collaboration, and creativity.<br />
        Dedicated to making every event impactful and memorable.
      </p>
    </div>
  </div>
