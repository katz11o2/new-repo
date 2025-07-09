<script>
  const servicesTop = [
    {
      gif: 'images/ai.gif',
      title: '20+',
      description: 'Industry partners have collaborated with us'
    },
    {
      gif: 'images/iot.gif',
      title: '1500+',
      description: 'Unique patents have been granted to our institution'
    },
    {
      gif: 'images/devops.gif',
      title: '98%',
      description: "Success rate to all our projects posted by industry partners"
    }
  ];

  const servicesBottom = [
    {
      gif: 'images/startup.gif',
      title: 'Industry Innovation',
      description: 'Transform your problem statement into a Feasible Solution'
    },
    {
      gif: 'images/funding.gif',
      title: 'Research Partnership',
      description: 'Access cutting edge research and development facilties'
    }
  ];
</script>

<style>

.image-below {
  margin-top: 80px;
  width: 90%;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.6s ease;
  cursor: pointer;
}

.image-below:hover {
  transform: scale(1.03);
}

.image-below::after {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    130deg,
    rgba(192, 192, 192, 0) 40%,
    rgba(192, 192, 192, 0.4) 50%,
    rgba(192, 192, 192, 0) 60%
  );
  transform: rotate(0deg);
  pointer-events: none;
  opacity: 0;
}

.image-below:hover::after {
  animation: popup-glow 1s forwards;
  opacity: 1;
}

@keyframes popup-glow {
  0% {
    transform: translate(-100%, -100%);
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: translate(100%, 100%);
    opacity: 0;
  }
}


  .services-section {
    background: #fdfdfd;
    padding: 40px 20px;
    font-family: 'Poppins', sans-serif;
    color: #222;
    text-align: center;
  }

  .services-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .service-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-top: 30px;
  }

  .service-card {
    width: 220px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: transform 0.3s ease;
  }

  .service-card:hover {
    transform: translateY(-6px);
  }

  .service-gif {
    width: 30%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 12px;
  }

  .service-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #111;
    margin-bottom: 6px;
  }

  .service-desc {
    font-size: 0.85rem;
    font-weight: 400;
    color: #444;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    .service-card {
      width: 100%;
      max-width: 90%;
    }

    .services-title {
      font-size: 1.4rem;
    }

    .service-gif {
      width: 50%;
    }
  }
</style>

<div class="services-section">
  <div class="service-grid">
    {#each servicesTop as service}
      <div class="service-card">
        <img class="service-gif" src="{service.gif}" alt="{service.title}" />
        <div class="service-title">{service.title}</div>
        <p class="service-desc">{service.description}</p>
      </div>
    {/each}
  </div>

  <div class="service-grid">
    {#each servicesBottom as service}
      <div class="service-card">
        <img class="service-gif" src="{service.gif}" alt="{service.title}" />
        <div class="service-title">{service.title}</div>
        <p class="service-desc">{service.description}</p>
      </div>
    {/each}
  </div>

 <img class="image-below" src="/images/1.png" alt="Decorative Image" />


</div>


