<script>
  const rows = [
    [
      {
        name: "Shri D.K Mohan",
        role: "Chairman, CGI",
        link: "/chairman",
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2020/12/Chairman-600x410-1.jpg.webp"
      },
      {
        name: "Shri Nithin Mohan",
        role: "CEO, CITech ",
        link: "/ceo",
        image: "https://i.ibb.co/B1Mz9nV/IMG-7217.jpg"
      },
      {
        name: "Dr. G Indumathi",
        role: "Prinicpal, CITech",
        link: "/princi",
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2021/09/Principal1.png.webp"
      }
    ],
    [
      {
        name: "Shri Srinivas M. Jamkhandi ",
        role: "Advisior-Innovation, CITech",
        link: "/srini",
        image: "https://i.ibb.co/4wvg2LQs/11111111.jpg"
      },
      {
        name: "Dr. M Varalatchoutmy",
        role: "Head - CIC, CITech",
        link: "cichead",
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2023/06/536e21ff-2f83-4f7f-8cfb-f3707a562081.jpg"
      }
    ],
    [
      {
        name: "Dr. S R Shanthi",
        role: "Professor & Dean, BS, CITech",
       
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2023/06/Dean.png"
      },
      {
        name: "Dr. Shreekanth M Prabhu",
        role: "Professor & Head, CSE, CITech",
        
        image: "https://media.licdn.com/dms/image/v2/C4D03AQHXSzSF4MXFKA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516239447507?e=1757548800&v=beta&t=udRYiCjrzJVKWwhEIu72kT2ifi3FVBAfN-LMXHlyXdw"
      },
      {
        name: "Dr. Preethi S",
        role: "Professor & Head, ISE, CITech",
       
        image: "https://faculty.cambridge.edu.in/wp-content/uploads/2021/08/Ms.-Preethi-S-associate-professor.jpg"
      },
      {
        name: "Dr. Sandeep Kumar",
        role: "Professor & Head, CS-IOT, CITech",
       
        image: "https://faculty.cambridge.edu.in/wp-content/uploads/2021/11/Sandeep-Kumar-associate-professor.webp"
      }
    ],
    [
      {
        name: "Dr. Varalatchoumy M",
        role: "Professor & Head, AIML, CITech",
       
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2023/06/536e21ff-2f83-4f7f-8cfb-f3707a562081.jpg"
      },
      {
        name: "Dr. Shiva Panchakshari T G",
        role: "Professor & Head, ECE, CITech",
       
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2022/03/DSC_1035-2048x1362.jpg"
      },
      {
        name: "Dr.Sujatha",
        role: "Professor & Head, EEE, CITech",
       
        image: "https://faculty.cambridge.edu.in/wp-content/uploads/2021/08/B-G-Sujatha-associate-professor.jpg"
      },
      {
        name: "Dr. Shankar B S",
        role: "Professor & Head, Civil, CITech",
      
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2021/11/Dr.-SHANKAR-B.S-Professor-and-HOD-CIVIL.jpg"
      }
    ],
    [
      {
        name: "Dr. Suneelkumar N Kulkarni",
        role: "Professor & Head, Mechanical, CITech",
      
        image: "https://engg.cambridge.edu.in/wp-content/uploads/2021/03/mech-hod-Dr-Suneelkumar-N-Kulkarni.jpg"
      },
      {
        name: "Dr. Ravi",
        role: "Professor & Head, MBA, CITech",
       
        image: "https://media.licdn.com/dms/image/v2/C5103AQGpD02sI7GKMQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1549959731357?e=1757548800&v=beta&t=up4DeO6eHi-hL1SsrhyMdrt3tvujCOcjDdb2zwmTlRQ"
      },
      {
        name: "Prof. Diwakar Karadi",
        role: "Assistant Professor & Head, MCA, CITech",
     
        image: "https://faculty.cambridge.edu.in/wp-content/uploads/2021/11/Diwakar-Karadi-assistant-professor-mca.jpg"
      }
    ],
    [
      {
        name: "Mr. Syed Hayath",
        role: "Web Administrator, Cambrian Incubation Centre, CITech",
       
        image: "https://i.postimg.cc/g2L1bDMC/DSC-092898.jpg"
      },
      {
        name: "Mr. Arun Singh",
        role: "Operations Manager, Cambrian Incubation Centre, CITech",
      
        image: "https://i.ibb.co/B2xmBwjy/arun.png"
      }
    ]
  ];
</script>

<style>

  .glass-section {
    padding: 60px 20px;
    background: #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  .glass-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }

  .glass-box {
    backdrop-filter: blur(16px);
    background: #ffffff;
    border: 2px solid #addcff; /* Light blue border */
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    padding: 30px 20px;
    width: 300px;
    max-width: 100%;
    text-align: center;
    transition: all 0.4s ease;
  }

  .glass-box:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  .glass-box img {
    width: 80px;
    height: 80px;
    margin-bottom: 18px;
    border-radius: 10px;
  }

  .glass-box h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 12px;
  }

  .glass-box p {
    font-size: 0.95rem;
    color: #222;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .glass-box button {
    background: rgba(0, 191, 255, 0.1);
    border: 3px solid #00bfff;
    color: #00bfff;
    padding: 10px 20px;
    font-weight: 500;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .glass-box button:hover {
    background: #00bfff;
    color: white;
  }

  @media (max-width: 768px) {
  .glass-container {
    flex-direction: column; /* Stack vertically */
    align-items: center;    /* Center the boxes horizontally */
  }

     .glass-box {
    width: 90%; /* Optional: make each box fill more horizontal space */
  }
}

  .initiatives-section {
    background: #fff;
    padding: 20px 20px;
    text-align: center;
  }

  .initiatives-container h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    color: #1a1a1a;
    margin-bottom: 10px;
    font-weight: 900;
  }

  .initiatives-container h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: #000;
    margin-bottom: 10px;
  }

  .initiatives-container h1 span {
    color: #1da1f2;
    font-weight: 700;
  }

  .initiatives-container p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    color: #555;
    
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .initiatives-container h1 {
      font-size: 2rem;
    }

    .initiatives-container p {
      font-size: 1rem;
    }
  }
  .section-heading {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .section-heading h2 {
    font-size: 1.6rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

   .initiatives-section {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    padding: 20px 20px 20px;
    background-color: white;
    color: #1a1a1a;
  }

  .initiatives-section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0a0a23;
    margin-bottom: 12px;
  }

  .initiatives-section h1 {
    font-size: 2.6rem;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .initiatives-section .highlight {
    background: linear-gradient(to right, #a8dcff, #008cff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .initiatives-section p {
    font-size: 1rem;
    color: #555;
    max-width: 850px;
    margin: 0 auto;
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .initiatives-section h1 {
      font-size: 2rem;
    }

    .initiatives-section p {
      font-size: 0.95rem;
    }
  }

  .decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 50px;
  }

  .dot {
    width: 10px;
    height: 10px;
    background-color: blue;
    border-radius: 50%;
  }

  .line {
    width: 350px;
    height: 2px;
    background-color:#17194a;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0 10px;
    margin: 80px 0;
  }

  .team-box {
    display: flex;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    width: 100%;
    max-width: 280px;
    height: 100px;
    text-decoration: none;
  }

  .team-box:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 119, 255, 0.2);
  }

  .image-placeholder {
    width: 80px;
    min-height: 100px;
    background-color: #e2e2e2;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    padding: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content h1 {
    margin: 0 0 4px;
    font-size: 0.67rem;
    color: #1d1d1f;
    font-weight: 600;
  }

  .content p {
    font-size: 0.55rem;
    color: #555;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .podium-showcase {
  background: #fff;
  padding: 30px 30px 80px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.podium-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 50px;
}

.podium-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
}

.podium-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease;
}

.podium-box:hover {
  transform: scale(1.05);
}

.person {
  font-size: 3rem;
  margin-bottom: 12px;
}

.startup-box {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  color: #222;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.base {
  width: 80px;
  height: 60px;
  background: #ddd;
  border-radius: 10px 10px 0 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}

.first .base {
  background: gold;
  height: 100px;
  z-index: 2;
}
.second .base {
  background: silver;
  height: 80px;
}
.third .base {
  background: #cd7f32; /* bronze */
  height: 60px;
}

@media (max-width: 768px) {
  .podium-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .podium-box {
    margin-bottom: 30px;
  }
}


  @media (min-width: 600px) {
    .row {
      flex-wrap: nowrap;
      justify-content: center;
    }

    .team-box {
      max-width: 240px;
      height: 90px;
    }

    .image-placeholder {
      width: 70px;
      min-height: 90px;
    }

    .content h1 {
      font-size: 0.75rem;
    }

    .content p {
      font-size: 0.6rem;
    }

    
  }
</style>

<div class="section-heading">
  <h2>Meet your distinguished team</h2>
  <div class="decoration">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="line"></span>
  </div>
</div>



{#each rows as row}
  <div class="row">
    {#each row as member}
      <a href={member.link} class="team-box">
        <div class="image-placeholder">
          <img src={member.image} alt={member.name} />
        </div>
        <div class="content">
          <h1>{member.name}</h1>
          <p>{member.role}</p>
        </div>
      </a>
    {/each}
  </div>
{/each}





<div class="initiatives-section">
  
  <h1>
    Transform Your Ideas Into 
    <span class="highlight">Innovation Reality</span>
  </h1>
  <p>
    Partner with us to access world-class resources, expert guidance, and comprehensive support to bring your innovations to life.
  </p>
</div>

<section class="glass-section">
  <div class="glass-container">
    <div class="glass-box">
      <img src="/images/solve.gif" alt="Industry Problem Solving" />
      <h3>Industry Problem Solving</h3>
      <p>Transform complex challenges into opportunities with expert solutions.</p>
      <a href="/research"><button>Learn More</button></a>
    </div>

    <div class="glass-box">
      <img src="/images/rd.gif" alt="R&D Partnership" />
      <h3>R&D Partnership</h3>
      <p>Access research labs and collaborate with experts to boost your innovations.</p>
      <a href="/rd"><button>Learn More</button></a>
    </div>

    <div class="glass-box">
      <img src="/images/support.gif" alt="Innovation Support" />
      <h3>Innovation Support</h3>
      <p>Get end-to-end support from idea to market with mentorship and funding.</p>
      <a href="/is"><button>Learn More</button></a>
    </div>
  </div>
</section>


