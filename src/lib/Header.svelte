<script>
  import LogoLeft from '../lib/logos/CIT.png';
  import LogoCenter from '../lib/logos/CIC.png';
  import LogoRight from '../lib/logos/CHOSS.png';
  import { onMount } from 'svelte';

  let isMobile = false;
  let showMobileMenu = false;

  function goBack() {
    window.history.back();
  }

  onMount(() => {
    isMobile = window.innerWidth <= 640;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 640;
    });
  });

  function toggleMenu() {
    showMobileMenu = !showMobileMenu;
  }
</script>

<style>
  header {
    background-color: #17194a;
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 100%;
    overflow-x: hidden;
    padding-bottom: 5px;
  }

  .logo-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    position: relative;
  }

  .logo {
    height: 40px;
    max-width: 130px;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  .left-logo {
    margin-left: 15px;
    height: 40px;
    transform: scale(1.1);
    transform-origin: left center;
  }

  .right-logo {
    margin-right: 20px;
  }

  .center-logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 0.3s ease;
  }

  .center-logo:hover {
    transform: translateX(-50%) scale(1.05);
  }

  .menu-bar {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 4px 0;
    flex-wrap: wrap;
    align-items: center;
  }

  .menu-link {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 12px;
    transition: text-shadow 0.5s ease;
  }

  .menu-link:hover {
    text-shadow: 0 0 6px rgba(192, 192, 192, 0.8);
  }

  .back-button {
    background: none;
    border: none;
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    animation: vibrate 1.5s infinite ease-in-out;
    padding: 0;
    margin-right: 20px;
  }

  .back-button:hover {
    text-shadow: 0 0 6px rgba(192, 192, 192, 0.8);
  }

  @keyframes vibrate {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    50% { transform: translateX(2px); }
    75% { transform: translateX(-1px); }
  }

  /* Hide original menu bar and show hamburger on mobile */
  @media (max-width: 640px) {
    .logo {
      height: 28px;
      max-width: 60px;
    }

    .menu-bar {
      display: none;
    }

    .hamburger {
      display: block;
      color: white;
      font-size: 20px;
      margin: 10px;
      cursor: pointer;
      padding: 5px 15px;
    }

    .mobile-menu {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 15px;
      gap: 10px;
      padding-bottom: 10px;
    }

    .mobile-menu a,
    .mobile-menu button {
      font-size: 14px;
    }
  }

  /* Desktop: hide hamburger */
  .hamburger {
    display: none;
  }

  .mobile-menu {
    display: none;
  }
</style>

<header>
  <!-- Logo Bar -->
  <div class="logo-bar">
    <a href="https://www.cambridge.edu.in/" target="_blank" rel="noopener">
      <img src={LogoLeft} alt="Left Logo" class="logo left-logo" />
    </a>

    <a href="/" class="center-logo">
      <img src={LogoCenter} alt="Center Logo" class="logo" />
    </a>

    <a href="https://choss.cambridge.edu.in/" target="_blank" rel="noopener">
      <img src={LogoRight} alt="Right Logo" class="logo right-logo" />
    </a>
  </div>

  <!-- Desktop Menu -->
  <nav class="menu-bar">
    <button class="back-button" on:click={goBack}>←</button>
    <a href="/" class="menu-link">Home</a>
    <a href="/about" class="menu-link">About us</a>
    <a href="/events" class="menu-link">Calender of Events</a>
    <a href="/advisory" class="menu-link">Advisory Committee</a>
    <a href="/facilities" class="menu-link">Facilities</a>
    <a href="/login" class="menu-link">Register/Login</a>
    <a href="/beneficiaries" class="menu-link">Beneficiaries</a>
    <a href="https://engg.cambridge.edu.in/photo-gallery/" class="menu-link">Gallery</a>
    <a href="/contact" class="menu-link">Contact Us</a>
  </nav>

  <!-- Mobile Hamburger Button -->
  {#if isMobile}
    <div class="hamburger" on:click={toggleMenu}>
      ☰ Menu
    </div>
    {#if showMobileMenu}
      <nav class="mobile-menu">
        <button class="back-button" on:click={goBack}>←</button>
        <a href="/" class="menu-link">Home</a>
        <a href="/about" class="menu-link">About us</a>
        <a href="/events" class="menu-link">Calender of Events</a>
        <a href="/advisory" class="menu-link">Advisory Committee</a>
        <a href="/facilities" class="menu-link">Facilities</a>
        <a href="/login" class="menu-link">Register/Login</a>
        <a href="/beneficiaries" class="menu-link">Beneficiaries</a>
        <a href="https://engg.cambridge.edu.in/photo-gallery/" class="menu-link">Gallery</a>
        <a href="/contact" class="menu-link">Contact Us</a>
      </nav>
    {/if}
  {/if}
</header>
