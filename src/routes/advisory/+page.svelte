<script>
  const advisors = [
    
    {
      name: "Shri. Srinivas M. Jamkhandi",
      designation: "Former Director-MoMSME, GoI",
      image: "https://i.ibb.co/4wvg2LQs/11111111.jpg",
      link: "https://cambrian-sparkzone.com/srini"
    },
    {
      name: "Shri. B S Srinivasan",
      designation: "Chairman - Progress, Industry - Academia Connect, LUBK",
      image: "https://i.ibb.co/99G2R9Ld/Whats-App-Image-2025-08-29-at-20-19-15-eff1194b.jpg",
      link: "https://lubkarnataka.org/office-bearers/"
    },
    {
      name: "Shri. Danappa D.P",
      designation: "President – PIA",
      image: "https://piapeenya.com/wp-content/uploads/2025/07/DANAPPA-D.P.jpg",
      link: "https://piapeenya.com/presidents-message/"
    },
    {
      name: "Shri B.R. Ganesh Rao",
      designation: "President - KASSIA",
      image: "https://i.ibb.co/jPsJSJFB/PRESIDENT-Copy.jpg",
      link: "http://kassia.org.in/council-members-2/"
    },
     {
      name: "Shri Chandrasekaran. S",
      designation: "President - WACIA",
      image: "https://wacia.in/images/chandrasekaran.jpg",
      link: "https://wacia.in/management.html"
    },

     {
      name: "Shri Ajay Bhargav",
      designation: "President - DIA",
      image: "https://dia-association.com/wp-content/uploads/2025/09/mr-ajay-bhargav-1.png",
      link: "https://dia-association.com/our-team/"
    },

     {
      name: "Dr Selva Kumar . S",
      designation: "Chairman - TMTP",
      image: "",
      link: "http://tmtp.in/about-us/board-of-directors"
    },

     {
      name: "Shri Sriprakasha",
      designation: "President - MKAIA",
      image: "https://www.mkaia.org/wp-content/uploads/2023/10/sriprakasha_pres.jpg",
      link: "https://www.mkaia.org/office-bearers/"
    },
    {
      name: "Shri Narayana Prasanna K",
      designation: "President - LUB",
      image: "https://i.ibb.co/Ld1tgqWp/KNP.jpg",
      link: "https://lubkarnataka.org/office-bearers/"
    }
  ];
</script>

<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #fff;
  }

  .section {
    padding: 4rem 2rem;
    text-align: center;
  }

  h1 {
    color: #1e3a8a;
    margin-bottom: 8px;
    font-size: 2rem;
    font-weight: bold;
  }

  .dot-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 3rem;
    animation: slideIn 1s ease;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #1e3a8a;
  }

  .line {
    flex: 1;
    height: 1px;
    max-width: 60px;
    background-color: #1e3a8a;
  }

  /* --- GRID LAYOUT --- */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    max-width: 1100px;
    margin: auto;
  }

  .cards-container.second-row {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 2.5rem;
  }

  .card {
    background: linear-gradient(145deg, #ffffff, #f9f9f9);
    border-radius: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 2rem 1.5rem;
    transition: all 0.3s ease;
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
    text-decoration: none;
    color: inherit;
    display: block;
  }

  /* Stagger animation */
  .card:nth-child(1) { animation-delay: 0.1s; }
  .card:nth-child(2) { animation-delay: 0.3s; }
  .card:nth-child(3) { animation-delay: 0.5s; }
  .card:nth-child(4) { animation-delay: 0.7s; }
  .card:nth-child(5) { animation-delay: 0.9s; }

  .card:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 16px 40px rgba(30, 58, 138, 0.2);
  }

  .image-container {
    width: 120px;
    height: 120px;
    margin: 0 auto 1.2rem;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid #1e3a8a33;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    animation: zoomIn 0.6s ease both;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .image-container img {
    transform: scale(1.08);
  }

  .name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #111;
    margin-top: 0.5rem;
  }

  .designation {
    font-size: 0.95rem;
    color: #555;
    margin-top: 0.3rem;
    white-space: pre-line;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .cards-container,
    .cards-container.second-row {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .cards-container,
    .cards-container.second-row {
      grid-template-columns: 1fr;
    }
  }

  /* --- Animations --- */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes zoomIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
</style>

<section class="section">
  <h1>Advisory Committee</h1>
  <div class="dot-line">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="line"></div>
  </div>

  <!-- First row (3 cards: HOD, Jamkhandi, Srinivasan) -->
  <div class="cards-container">
    {#each advisors.slice(0,3) as person}
      <a href={person.link} target="_blank" class="card">
        <div class="image-container">
          <img src={person.image} alt={person.name} />
        </div>
        <div class="name">{person.name}</div>
        <div class="designation">{person.designation}</div>
      </a>
    {/each}
  </div>

  <!-- Second row (next 3 cards) -->
  <div class="cards-container second-row">
    {#each advisors.slice(3) as person}
      <a href={person.link} target="_blank" class="card">
        <div class="image-container">
          <img src={person.image} alt={person.name} />
        </div>
        <div class="name">{person.name}</div>
        <div class="designation">{person.designation}</div>
      </a>
    {/each}
  </div>
</section>
