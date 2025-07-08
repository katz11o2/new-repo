<script>
  import { onMount } from 'svelte';

  let currentImageIndex = 0;
  const images = [
    '/src/lib/logos/Artboard 1 copy.jpg',
    '/src/lib/logos/Artboard 1.jpg'
  ];

  let interval;

  onMount(() => {
    interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 4000);

    return () => clearInterval(interval);
  });

  const items = [
    "Welcome to Cambrian Incubation Center, We invite you to post your design challenges and we can build a solution for it!",
    "15+ MSME has colloborated and posted their problem statments with CIC"
  ];

  function scrollByAmount(amount) {
    window.scrollBy({ top: amount, behavior: 'smooth' });
  }
</script>

<style>
  .image-banner {
    width: 100%;
    margin-top: 1px;
    position: relative;
    overflow: hidden;
  }

  .image-banner img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    animation: slideFade 1s ease-in-out, glow 4s infinite;
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
      max-height: 120px;
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
    width: 10%;
    padding-left: 20px;
    font-weight: bold;
    font-size: 0.75rem;
  }

  .center {
    width: 70%;
    position: relative;
    overflow: hidden;
    height: 24px;
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

<!-- ✅ Ticker Section -->
<div class="ticker">
  <div class="left">News Updates</div>

  <div class="center">
    <div class="scroll-content">
      {#each Array(10) as _, i}
        {#each items as item}
          <span>{item}</span>
        {/each}
      {/each}
    </div>
  </div>

  <div class="right">
    <div class="circle-wrapper" on:click={() => scrollByAmount(100)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Brief</span>
      <span class="circle-label mobile">A</span>
    </div>
    <div class="circle-wrapper" on:click={() => scrollByAmount(200)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Team</span>
      <span class="circle-label mobile">B</span>
    </div>
    <div class="circle-wrapper" on:click={() => scrollByAmount(300)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Startups</span>
      <span class="circle-label mobile">C</span>
    </div>
    <div class="circle-wrapper" on:click={() => scrollByAmount(400)}>
      <div class="circle"></div>
      <span class="circle-label desktop">Initiatives</span>
      <span class="circle-label mobile">D</span>
    </div>
  </div>
</div>

<!-- ✅ Full-width Animated Banner Below Ticker -->
<div class="image-banner">
  <img src="{images[currentImageIndex]}" alt="Banner" />
</div>
