<script>
  import { onMount } from 'svelte';

  let showMenu = false;

  let currentImageIndex = 0;

  const images = [
    '/images/Artboard 1 copy.jpg',
    '/images/Artboard 1.jpg'
  ];

  // ✅ Reactive image source
  $: src = images[currentImageIndex];

  let interval;

  // ✅ Image changes every 4 seconds
  onMount(() => {
    interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 4000);

    return () => clearInterval(interval);
  });

  const items = [
    `Welcome to Cambrian Incubation Center, We invite you to post your design challenges and we can build a solution for it! <a href="/login" class="link">Click Here</a>`
  ];

  function scrollByAmount(amount) {
    window.scrollBy({ top: amount, behavior: 'smooth' });
  }

  function toggleMenu() {
  showMenu = !showMenu;
}

</script>


<style>
    .image-banner {
      width: 100%;
      margin-top: 1px;
      position: relative;
      overflow: hidden;
    }

    /* Only show hamburger icon on mobile */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  padding: 10px;
}

.hamburger div {
  width: 25px;
  height: 3px;
  background-color: white;
}

/* Desktop: show circles, hide hamburger */
.hamburger {
  display: none;
}

/* Mobile only: hide .right, show hamburger */
@media (max-width: 600px) {
  .right {
    display: none !important;
  }

  .hamburger {
    display: flex !important;
  }
}


.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: black; /* Fix color */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  gap: 1rem; /* ✅ space between items */
  z-index: 9999;
}


.fullscreen-menu button {
  position: absolute;
  top: 10px;
  right: 90px;
  background: transparent;
  color: rgb(53, 13, 106);
  font-size: 44px;
  border: none;
  cursor: pointer;
}


  .image-banner img {
  width: 100%;
  height: auto;
  object-fit: contain; /* or use 'cover' if you want cropping/fill */
  display: block;
  animation: slideFade 1s ease-in-out, glow 4s infinite;
  max-height: 100vh; /* optional: prevents extreme vertical stretch */
}

.fullscreen-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fullscreen-menu li {
  margin-bottom: 4.5rem; /* Optional extra spacing */
}

.fullscreen-menu a {
  color: rgb(25, 10, 88);
  text-decoration: none;
  font-size: 1.2rem;
}



  @keyframes slideFade {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @keyframes glow {
    0% {
      filter: drop-shadow(0 0 2px silver);
    }
    50% {
      filter: drop-shadow(0 0 10px silver);
    }
    100% {
      filter: drop-shadow(0 0 2px silver);
    }
  }

 @media (max-width: 600px) {
  .image-banner img {
    max-height: 200px; /* optional limit */
  }
}


  .ticker {
    background-color: #17194a;
    color: white;
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    padding: 16px 0;
    overflow: hidden;
  }

  .left {
    width: 12%;
    padding-left: 20px;
    font-weight: bold;
    font-size: 0.75rem;
  }

  .center {
    width: 70%;
    position: relative;
    overflow: hidden;
    height: 16px;
  }

  .scroll-content {
    display: inline-block;
    white-space: nowrap;
    animation: scroll 170s linear infinite;
    font-size: 0.75rem;
    position: absolute;
    left: 50%;
    transform: translateX(0%);
  }

  

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .scroll-content span {
    margin: 0 16px;
    transition: transform 0.2s;
  }

  .scroll-content span:hover {
    transform: scale(3);
  }

  .right {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 26px;
    padding-right: 30px;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .circle-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .circle {
    width: 9px;
    height: 9px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }

  .circle:hover {
    transform: scale(1.7);
  }

  .circle-label {
    font-size: 0.75rem;
    color: white;
    white-space: nowrap;
  }

.link {
  color: white !important;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
}

.link:hover {
  color: #00ffff !important;
}




  @media (max-width: 600px) {
    .circle-wrapper {
      flex-direction: column;
      align-items: center;
      gap: 1px;
    }

    .circle-label {
      font-size: 0.55rem;
    }

    .right {
      gap: 18px;
      padding-right: 30px;
    }

    .circle {
      width: 6px;
      height: 6px;
    }

    .circle-label.desktop {
      display: none;
    }

    .circle-label.mobile {
      display: block;
    }
  }

  .circle-label.mobile {
    display: none;
  }
</style>

<div class="ticker">
  <div class="left">News Updates</div>

  <div class="center">
    <div class="scroll-content">
      {#each Array(10) as _, i}
        {#each items as item}
          <span>{@html item}</span>
        {/each}
      {/each}
    </div>
  </div>

  <div class="right">
    <div class="circle-wrapper" on:click={() => scrollByAmount(500)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Brief</span>
      <span class="circle-label mobile">A</span>
    </div>
    <div class="circle-wrapper" on:click={() => scrollByAmount(1500)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Team</span>
      <span class="circle-label mobile">B</span>
    </div>
    <div class="circle-wrapper" on:click={() => scrollByAmount(2800)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Startups</span>
      <span class="circle-label mobile">C</span>
    </div>
    <div class="circle-wrapper" on:click={() => scrollByAmount(3200)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Initiatives</span>
      <span class="circle-label mobile">D</span>
    </div>
  </div>

  <div class="hamburger" on:click={toggleMenu}>
  <div></div>
  <div></div>
  <div></div>
</div>
</div>

<!-- ✅ Place hamburger OUTSIDE ticker -->


{#if showMenu}
  <div class="fullscreen-menu">
    <button on:click={toggleMenu}>&times;</button>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About us</a></li>
      <li><a href="/calendar">Calendar of Events</a></li>
      <li><a href="/advisory">Advisory Committee</a></li>
      <li><a href="/facilities">Facilities</a></li>
      <li><a href="/login">Register/Login</a></li>
      <li><a href="/beneficiaries">Beneficiaries</a></li>
      <li><a href="/gallery">Gallery</a></li>
      <li><a href="/contact">Contact Us</a></li>
    </ul>
  </div>
{/if}



<!-- ✅ Full-width Animated Banner Below Ticker -->
<div class="image-banner">
 <img {src} alt="Banner" />

</div>
