<script>
  const cards = [
    {
      gif: "images/iot.gif",
      title: "CHOSS Certified",
      desc: "Recognized Center of Excellence by Cambridge Institute of Technology"
    },
    {
      gif: "images/devops.gif",
      title: "MSME Host Institution",
      desc: "Official host institution status from Ministry of MSME, Government of India"
    },
    {
      gif: "images/aii.gif",
      title: "IISc Partnership",
      desc: "Strategic collaboration with Indian Institute of Science, Bangalore, India"
    }
  ];
</script>

<section class="details-section">
  <div class="cards-grid">
    {#each cards as card}
      <div class="card">
        <img src={card.gif} alt={card.title} class="gif" />
        <h3>{card.title}</h3>
        <p>{card.desc}</p>
      </div>
    {/each}
  </div>
</section>

<section class="support-section">
<div class="section-heading">
     <h2>Who We Support</h2>
  <div class="decoration">
    
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="line"></span>
  </div>
 
</div>

  <div class="support-boxes">
    <div class="support-card creative">
      <div class="highlight-bar"></div>
      <div class="support-content">
        <h3> Students & Researchers</h3>
        <p>Empowering the next generation of innovators with resources, mentorship, and funding opportunities.</p>
        <ul>
          <li> Research & Development Support</li>
          <li> Academic Project Incubation</li>
          <li> Industry Collaboration</li>
          <li> Skill Development Workshops</li>
        </ul>
        <a href="login">Apply Now →</a>
      </div>
    </div>

    <div class="support-card creative">
      <div class="highlight-bar"></div>
      <div class="support-content">
        <h3> MSMEs & Startups</h3>
        <p>Comprehensive support for micro, small, and medium enterprises to scale and succeed in competitive markets.</p>
        <ul>
          <li> Business Model Validation</li>
          <li> Market Entry Strategy</li>
          <li>Technology Transfer</li>
          <li> Funding & Investment Support</li>
       
        </ul>
        <a href="login">Apply Now →</a>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  :global(body) {
    font-family: 'Poppins', sans-serif;
  }

  .details-section {
    background: white;
    padding: 3rem 0.5rem;
    display: flex;
    justify-content: center;
  }

  

  


  .cards-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    width: 100%;
    padding: 0 1rem;
  }

  .card {
    background: white;
    padding: 1.2rem 1rem;
    border-radius: 0.8rem;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  }

  .gif {
    width: 48px;
    height: 48px;
    object-fit: contain;
    margin-bottom: 0.8rem;
    transition: transform 0.3s ease;
  }

  .card:hover .gif {
    transform: rotate(5deg) scale(1.1);
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.85rem;
    color: #444;
  }

  /* Support Section */
  .support-section {
    background: white;
    padding: 3rem 0.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

 .section-heading {
  text-align: center;
  margin-bottom: 2rem;
}

.decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 1rem;
  margin-bottom: 4rem; /* reduced from 70px to 0.4rem for tight spacing */
}

.dot {
  width: 10px;
  height: 10px;
  background-color: blue;
  border-radius: 50%;
}

.line {
  width: 180px;
  height: 2px;
  background-color: #17194a;
}

.support-section h2 {
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0; /* removed bottom margin for even less gap */
  color: #222;
}


  .support-boxes {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .support-card.creative {
    position: relative;
    display: flex;
    background: white;
    border-radius: 0.8rem;
    overflow: hidden;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease;
  }

  .support-card.creative:hover {
    transform: translateY(-5px);
  }

  .highlight-bar {
    width: 6px;
    background: linear-gradient(180deg, #4facfe, #00f2fe);
  }

  .support-content {
    padding: 1.2rem;
    flex: 1;
  }

  .support-content h3 {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  .support-content p {
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
    color: #444;
  }

  .support-content ul {
    list-style: none;
    padding: 0;
    margin: 0 0 0.8rem;
  }

  .support-content li {
    margin-bottom: 0.4rem;
    font-size: 0.85rem;
    color: #333;
  }

  .support-content a {
    text-decoration: none;
    color: #007bff;
    font-weight: 600;
    font-size: 0.85rem;
  }

  @media (min-width: 768px) {
    .cards-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .support-boxes {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
