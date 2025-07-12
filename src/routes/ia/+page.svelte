<script>
  let logos = [
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
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1rem;
    text-align: center;
  }

  .heading {
    font-size: 2rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 2.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.5rem;
  }

  .logo-box {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeIn 0.5s ease-in-out forwards;
  }

  .logo-box:hover {
    transform: scale(1.06);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .logo-box img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  .logo-label {
    font-size: 13px;
    color: #374151;
    font-weight: 500;
    text-align: center;
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

<div class="wrapper">
  <div class="heading">Partners: MSME & Industry Associations</div>
  <div class="grid">
    {#each logos as logo}
      <a href={logo.href} target="_blank" class="logo-box">
        <img src={logo.src} alt={logo.alt} />
        <div class="logo-label">{logo.label}</div>
      </a>
    {/each}
  </div>
</div>
