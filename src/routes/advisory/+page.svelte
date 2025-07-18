<script>
  const advisors = [
    {
      name: "Dr. T Venkata Prabhakar",
      designation: "Chief Research Scientist,\nIndian Institute of Science (IISc)",
      image: "/images/ad2.jpg"
    },
    {
      name: "Mr. Srinivas M. Jamkhandi",
      designation: "Project Scientist (CoE)-DESE,\nIndian Institute of Science (IISc)",
      image: "https://i.ibb.co/4wvg2LQs/11111111.jpg"
    },
    {
      name: "Mr. Jamadagni H S",
      designation: "Retired Professor,\nIndian Institute of Science (IISc)",
      image: "/images/ad1.jpeg"
    }
  ];
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #fff;
  }

  .dot-line {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 20px;
    animation: slideIn 1s ease;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #1e3a8a;
  }

  .oot {
    padding: 0rem 3rem 2rem 1rem;
  }

  .line {
    flex: 1;
    height: 1px;
    background-color: #1e3a8a;
    max-width: 10%;
  }

  h1 {
    color: #1e3a8a;
    margin-bottom: 8px;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .section {
    padding: 4rem 1rem;
    text-align: center;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.8rem;
    max-width: 1200px;
    margin: auto;
    position: relative;
  }

  .card {
    background: linear-gradient(145deg, #ffffff, #f1f1f1);
    border-radius: 1.75rem;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 300px;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    z-index: 1;
    animation: fadeIn 0.8s ease both;
  }

  .card::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, #007bff33, transparent 60%);
    transform: scale(0);
    transition: transform 0.4s ease;
    z-index: -1;
  }

  .card:hover::before {
    transform: scale(1);
  }

  .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    width: 110px;
    height: 110px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #007bff33;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    animation: popIn 0.6s ease both;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .image-container img {
    transform: scale(1.05);
  }

  .name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0.5rem;
    color: #111;
  }

  .designation {
    font-size: 0.95rem;
    color: #666;
    margin-top: 0.3rem;
    white-space: pre-line;
  }

  @media (max-width: 768px) {
    .cards-container {
      gap: 1.5rem;
    }
    .card {
      width: 90%;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes popIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>

<section class="section">
  <div class='oot'>
    <h1>Advisory Committee</h1>
    <div class="dot-line">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="line"></div>
    </div>
  </div>
  <div class="cards-container">
    {#each advisors as person}
      <div class="card">
        <div class="image-container">
          <img src={person.image} alt={person.name} />
        </div>
        <div class="name">{person.name}</div>
        <div class="designation">{person.designation}</div>
      </div>
    {/each}
  </div>
</section>
