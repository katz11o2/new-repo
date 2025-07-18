<script>
  const facilities = [
    {
      title: "Cambrian Incubation Centre",
      image: "https://i.postimg.cc/N0Cyb8WL/Whats-App-Image-2025-04-24-at-13-07-15-4da42ecc.jpg",
      description: "A smart initiative fostering innovation and entrepreneurship with MSME support.",
      link: "/cic"
    },
    {
      title: "Auditorium",
      image: "https://i.postimg.cc/LsNwn5Gz/1Z0A1943.jpg",
      description: "Spacious and fully equipped for over 1,000 attendees during events.",
      link: "/auditorium"
    },
    {
      title: "Seminar Halls",
      image: "https://i.ibb.co/PZ9gVQV1/20241017-150016-1.jpg",
      description: "We have 2 Seminar halls with Modern space for hosting seminars.",
      link: "/seminar1"
    },
    {
      title: "Gym",
      image: "https://engg.cambridge.edu.in/wp-content/uploads/2023/06/DSC_0548-1-2048x1361.jpg",
      description: "Acoustically treated Gym for high-impact interactions.",
      link: "/gym"
    },
    {
      title: "Classrooms",
      image: "https://i.postimg.cc/R0WCSkDV/Whats-App-Image-2025-04-24-at-13-10-26-ef230c63.jpg",
      description: "Tech-enabled classrooms that enhance learning outcomes and focus.",
      link: "/classrooms"
    },
    {
      title: "Industry Labs",
      image: "https://i.postimg.cc/NG2B0xxh/DSC-0854.jpg",
      description: "Hands-on, cutting-edge labs to bridge academia and industry.",
      link: "/labs"
    },
    {
      title: "Canteen",
      image: "https://engg.cambridge.edu.in/wp-content/uploads/2025/05/DSC_9035-1-2048x1363.jpg",
      description: "Hygienic, affordable, and student-friendly space for meals and relaxation.",
      link: "/canteen"
    },
    {
      title: "Transport",
      image: "https://engg.cambridge.edu.in/wp-content/uploads/2022/01/transport-2048x1367.webp",
      description: "Reliable transport connecting key city points with the campus.",
      link: "/transport"
    },
    {
      title: "Library",
      image: "https://engg.cambridge.edu.in/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-28-at-12.34.23-PM-2048x1361.jpeg",
      description: "Extensive collection of academic, research, and digital resources.",
      link: "/library"
    }
  ];
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f9fafb;
  }

  .facilities-section {
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2.4rem;
    text-align: center;
    color: #1f2937;
    font-weight: 700;
    margin-bottom: 2.5rem;
  }

  .facilities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .facility-box {
    background: rgba(255, 255, 255, 0.88);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards;
    animation-delay: calc(var(--i) * 0.1s);
  }

  .facility-box:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
  }

  .facility-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  .facility-box:hover .facility-image {
    transform: scale(1.03);
  }

  .facility-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  .facility-box:hover .facility-title {
    color: #2563eb;
  }

  .facility-description {
    font-size: 0.95rem;
    color: #374151;
    text-align: center;
    line-height: 1.5;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  @media (max-width: 1024px) {
    .facilities-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .facilities-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="facilities-section">
  <h2>Campus Facilities</h2>

  <div class="facilities-grid">
    {#each facilities as facility, i}
      <a
        href={facility.link}
        class="facility-box"
        style="--i: {i}"
      >
        <img class="facility-image" src={facility.image} alt={facility.title} />
        <div class="facility-title">{facility.title}</div>
        <div class="facility-description">{facility.description}</div>
      </a>
    {/each}
  </div>
</div>
