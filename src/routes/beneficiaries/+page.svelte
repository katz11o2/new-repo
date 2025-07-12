<script>
  const startups = [
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Kokoshell-1-1086x1536.png',
      title: 'KoKo Shell',
      document: 'https://engg.cambridge.edu.in/wp-content/uploads/2025/01/Group-2.pdf'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/elementor/thumbs/121669489-finger-snapping-icon-transformed-1-q2mmhn9ejzpd3q2562e9fm4wztnyy5dqwbnglkz37g.webp',
      title: 'Gestify',
      document: 'https://example.com/doc6'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Happy-Cures-1-1086x1536.png',
      title: 'Happy Cures',
      document: 'https://example.com/doc7'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/LOGO-FINblack.png',
      title: 'Projectoo',
      document: 'https://example.com/doc8'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/EksauEk-150x150.png',
      title: 'Ek Sau Ek',
      document: 'https://example.com/doc9'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Assista-1-1086x1536.png',
      title: 'Assista',
      document: 'https://example.com/doc10'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Anime-Vyuh%E2%80%8B-1-1086x1536.png',
      title: 'Anime Vyuh',
      document: 'https://example.com/doc11'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Right-Path%E2%80%8B-1-1086x1536.png',
      title: 'Right Path',
      document: 'https://example.com/doc12'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Vitality-Monitor%E2%80%8B-1-1086x1536.png',
      title: 'Vitality Monitors',
      document: 'https://example.com/doc15'
    },
    {
      image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/V-Praxis-1-1086x1536.png',
      title: 'V-Praxis',
      document: 'https://example.com/doc16'
    }
  ];

  let selectedStartup = null;

  const openModal = (startup) => selectedStartup = startup;
  const closeModal = () => selectedStartup = null;

  const logos = [
    {
      src: 'https://static.wixstatic.com/media/f51316_4cce72566b71423cb7925545f11f01ad~mv2.png',
      alt: 'Logo 1',
      label: 'Galactic 3D',
      href: 'https://www.galactic-3d.com/'
    },
    {
      src: 'https://s.yimg.com/fz/api/res/1.2/7.CXxxjgs46XbH0BAQSn7A--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/fb61c8b0-7ef7-35fc-8c81-12f94c74d988/t_500x300',
      alt: 'Samsung',
      label: 'Samsung',
      href: 'https://www.samsung.com'
    },
    {
      src: 'https://static.wixstatic.com/media/6cc8a6_649b4f2565b1402385688354e1bb9d23~mv2.png',
      alt: 'Logo 3',
      label: 'Persapien Innovation',
      href: 'https://static.wixstatic.com/media/6cc8a6_649b4f2565b1402385688354e1bb9d23~mv2.png'
    },
    {
      src: 'https://dynamic.placementindia.com/recruiter_comp_logo/767881_20181001105507.jpg',
      alt: 'Logo 4',
      label: 'Avian Aerospace',
      href: 'https://example.com/4'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTURTbQTSs0hlF1I70gibdLhIQAIZk7S2Pvxw&s',
      alt: 'Logo 5',
      label: 'Brewcha',
      href: 'https://example.com/5'
    }
  ];
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #fff;
  }

  h1, .partner-heading {
    font-size: 2rem;
    font-weight: 600;
    color: #111827;
    padding: 2rem;
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
    padding-bottom: 100px;
  }

  .card {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    transition: all 0.4s ease;
    animation: fadeInUp 0.6s ease both;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .card img {
    height: 120px;
    object-fit: contain;
    margin-bottom: 1rem;
    transition: transform 0.4s ease;
  }

  .card:hover img {
    transform: scale(1.05);
  }

  .title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #222;
  }

  .modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: #fff;
    width: 90%;
    height: 90%;
    border-radius: 10px;
    padding: 20px;
    overflow: auto;
    animation: scaleIn 0.4s ease both;
  }

  .modal-content iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    background: #edd30b;
    color: #4b1f1f;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    background: #555;
    color: #fff;
  }

  .logo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 1.5rem;
    padding: 1rem 2rem 3rem;
  }

  .logo-box {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    animation: fadeIn 0.5s ease-in-out forwards;
  }

  .logo-box:hover {
    transform: scale(1.06);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }

  .logo-box img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  .logo-label {
    font-size: 0.85rem;
    color: #374151;
    font-weight: 500;
    text-align: center;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

<!-- Partners Section -->
<div class="partner-heading">Partners: MSME & Industry Associations</div>
<div class="logo-grid">
  {#each logos as logo}
    <a href={logo.href} target="_blank" class="logo-box">
      <img src={logo.src} alt={logo.alt} />
      <div class="logo-label">{logo.label}</div>
    </a>
  {/each}
</div>

<!-- Startups Section -->
<h1>Student Startups</h1>
<div class="grid">
  {#each startups as startup}
    <div class="card" on:click={() => openModal(startup)}>
      <img src={startup.image} alt={startup.title} />
      <div class="title">{startup.title}</div>
    </div>
  {/each}
</div>

{#if selectedStartup}
  <div class="modal open">
    <div class="modal-content">
      <button class="back-btn" on:click={closeModal}>Back</button>
      <h2>{selectedStartup.title}</h2>
      <iframe src={selectedStartup.document}></iframe>
    </div>
  </div>
{/if}
