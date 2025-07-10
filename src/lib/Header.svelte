<script>
  import LogoLeft from '../lib/logos/CIT.png';
  import LogoCenter from '../lib/logos/CIC.png';
  import LogoRight from '../lib/logos/CHOSS.png';
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
    transform: scale(1.05); /* subtle pop */
  }

  .left-logo {
    margin-left: 15px;
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
  transform: translateX(-50%) scale(1.05); /* pop without shifting */
}


  .menu-bar {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 4px 0;
    flex-wrap: wrap;
  }

  .menu-link {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 12px;
    transition: text-shadow 0.5s ease;
  }

  .menu-link:hover {
    text-shadow: 0 0 6px rgba(192, 192, 192, 0.8); /* silver glow */
  }

  @media (max-width: 640px) {
    .logo {
      height: 28px;
      max-width: 60px;
    }

    .menu-link {
      font-size: 14px;
    }
  }
</style>

<header>
  <!-- Logo Bar -->
  <div class="logo-bar">
    <img src={LogoLeft} alt="Left Logo" class="logo left-logo" />
    <img src={LogoCenter} alt="Center Logo" class="logo center-logo" />
    <img src={LogoRight} alt="Right Logo" class="logo right-logo" />
  </div>

  <!-- Menu Bar -->
  <nav class="menu-bar">
    <a href="/" class="menu-link">Home</a>
    <a href="/projects" class="menu-link">Calender of Events</a>
    
    <a href="/facilities" class="menu-link">Facilities</a>
    <a href="/login" class="menu-link">Register/Login</a>
    <a href="/beneficiaries" class="menu-link">Benificiaries</a>
     <a href="/contact" class="menu-link">Contact Us</a>
   </nav>
</header>
