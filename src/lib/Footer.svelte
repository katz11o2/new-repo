<script>
  import IISCLogo from '../lib/logos/IISC.png';
  import MSMELogo from '../lib/logos/MSME.png';
</script>


<style>
  footer {
    background-color: #17194a;
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 100%;
    padding: 40px  20px;
  }

  .footer-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    flex: 1;
    min-width: 220px;
    text-align: left;
  }

  .footer-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: left;
  }

  .footer-right {
    max-width: 200px;
    padding-right: 1px;
     line-height:2;
  }

  .footer-heading {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 10px;
    
  }

  .footer-text {
    font-size: 12px;
    opacity: 0.9;
    line-height: 1.8;
    margin-bottom: 12px;
  }

  .footer-logos {
    margin-top: 30px;
    display: flex;
    gap: 40px;
  }

  .footer-logo {
    height: 50px;
    transition: transform 0.3s ease;
  }

  .footer-logo:hover {
    transform: scale(1.05);
  }

  .quick-links a {
    display: block;
    text-decoration: none;
    color: white;
    font-size: 12px;
    margin: 2px 0;
    transition: transform 0.2s ease, color 0.3s;
  }

  .quick-links a:hover {
    transform: translateX(5px);
    color: silver;
  }

  .social-icons {
    display: flex;
    gap: 15px;
    margin-top: 10px;
  }

  .social-icons a {
    color: white;
    font-size: 20px;
    transition: transform 0.2s ease, color 0.3s;
  }

  .social-icons a:hover {
    transform: scale(1.1);
    color: silver;
  }

  .footer-bottom {
    text-align: center;
    font-size: 12px;
    opacity: 0.8;
    margin-top: 0px;
    padding: 10px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

   @media (max-width: 768px) {
    footer {
      padding: 30px 8px;
    }

    .footer-wrapper {
      flex-wrap: nowrap;
      gap: 2px;
    }

    .footer-left,
    .footer-center,
    .footer-right {
      flex: 1;
      min-width: 0;
    }

    .footer-left {
      padding-right: 4px;
    }

    .footer-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      max-width: 140px;
      padding-left: 80px;
    }

    .footer-right {
      max-width: 90px;
      padding-right: 0;
    }

    .footer-heading {
      font-size: 10px;
      margin-bottom: 5px;
    }

    .footer-text {
      font-size: 9px;
      line-height: 1.4;
      margin-bottom: 6px;
    }

    .footer-logos {
      gap: 10px;
      margin-top: 15px;
    }

    .footer-logo {
      height: 16px;
    }

    .quick-links a {
      font-size: 9px;
      margin: 1px 0;
    }

    .social-icons a {
      font-size: 14px;
      margin-right: 4px;
    }

    .footer-bottom {
      font-size: 9px;
      padding: 6px 0;
    }
  }

</style>

<footer>
<div class="footer-wrapper">
  <!-- Left Section -->
  <div class="footer-left">
    <div class="footer-heading">
      With Support From MSME - COE  <br> (IISc) &  Ministry of MSME (GoI)
    </div>
    <div class="footer-text">
      Transforming ideas into breakthrough <br> innovations since 2010.
    </div>
    <div class="footer-logos">
      <a href="https://iisc.ac.in/" target="_blank" rel="noopener noreferrer">
        <img src="{IISCLogo}" alt="IISc Logo" class="footer-logo" />
      </a>
      <a href="https://msme.gov.in/" target="_blank" rel="noopener noreferrer">
        <img src="{MSMELogo}" alt="MSME Logo" class="footer-logo" />
      </a>
    </div>
  </div>


    <!-- Center Section -->
    <div class="footer-center">
      <div class="footer-heading">Connect with us</div>
      <div class="footer-text">
        Follow us on social media<br />and stay updated with our events!
      </div>
      <div class="social-icons">
        <a href="https://www.youtube.com/@CITBengaluru"><i class="fab fa-youtube"></i></a>
        <a href="https://www.instagram.com/cit.bengaluru/"><i class="fab fa-instagram"></i></a>
        <a href="https://www.facebook.com/citech.official"><i class="fab fa-facebook"></i></a>
        <a href="https://www.linkedin.com/school/cambridge-institute-of-technology1/posts/?feedView=all"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>

    <!-- Right Section -->
    <div class="footer-right quick-links">
      <div class="footer-heading">Quick Links</div>
      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a href="/services">Facilities</a>
      <a href="/projects">Post Your Design Challenges</a>
      <a href="/contact">Gallery</a>
      <a href="/blog">Calender of events</a>
      <a href="/events">Register/Login</a>
      <a href="/team">Contact us</a>
    </div>
  </div>

  <!-- Bottom Text -->
  <div class="footer-bottom">
    © 2025 Cambrian Innovation and Incubation Center. All rights reserved.
  </div>
</footer>
