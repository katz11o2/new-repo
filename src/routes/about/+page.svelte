<script>
  // No script needed
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background: url('/your-background.jpg') no-repeat center center fixed;
    background-size: cover;
    overflow-x: hidden;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
  }

  .glass-wrapper {
    max-width: 1000px;
    width: 100%;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #93c5fd;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    color: #000;
    animation: popUp 1.2s ease-out forwards;
    opacity: 0;
    transform: scale(0.95);
  }

  @keyframes popUp {
    0% {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  h1,
  .team-title {
    color: #1e3a8a;
    margin-bottom: 8px;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  .dot-line {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 20px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #1e3a8a;
  }

  .line {
    flex: 1;
    height: 1px;
    background-color: #1e3a8a;
    max-width: 10%;
  }

  p {
    text-align: justify;
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 16px;
  }

  a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #1d4ed8;
  }

  .team-section {
    margin-top: 40px;
    text-align: left;
    position: relative;
  }

  .flow-diagram {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    position: relative;
  }

  .arrow-up,
  .arrow-down {
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    margin: 2px 0;
    transition: transform 0.3s ease;
  }

  .arrow-up {
    border-bottom: 20px solid #1e3a8a;
  }

  .arrow-down {
    border-top: 20px solid #1e3a8a;
  }

  .arrow-right,
  .arrow-left {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    transition: transform 0.3s ease;
  }

  .arrow-right {
    border-left: 20px solid #1e3a8a;
  }

  .arrow-left {
    border-right: 20px solid #1e3a8a;
  }

  .arrow-up:hover,
  .arrow-down:hover,
  .arrow-right:hover,
  .arrow-left:hover {
    transform: scale(1.1);
  }

  .box-hod {
    padding: 14px 28px;
    border-radius: 4px;
    background-color: #dbeafe;
    border: 2px solid #2563eb;
    font-weight: bold;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    color: black;
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
    animation: fadeIn 0.6s ease-out;
    display: inline-block;
  }

  .box-hod:hover {
    background-color: #bfdbfe;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  }

  .box-hod a {
    color: inherit;
    text-decoration: none;
    display: block;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .side-boxes,
  .right-boxes,
  .flow-diagram {
    pointer-events: auto;
  }

  .side-boxes {
    position: absolute;
    top: 72%;
    left: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-end;
  }

  .side-arrow {
    position: absolute;
    top: 72%;
    left: 300px;
    transform: translateY(-50%);
  }

  .right-boxes {
    position: absolute;
    top: 72%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .right-boxes .arrow-up,
  .right-boxes .arrow-down {
    align-self: center;
    margin-left: 10px;
  }

  .right-arrow {
    position: absolute;
    top: 72%;
    right: 300px;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    .glass-wrapper {
      padding: 24px;
    }

    h1,
    .team-title {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }

    .box-hod {
      font-size: 0.8rem;
      padding: 10px 20px;
    }

    .side-boxes,
    .right-boxes,
    .side-arrow,
    .right-arrow {
      display: none;
    }

    .flow-diagram {
      gap: 12px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 20px;
    }

    .glass-wrapper {
      padding: 16px;
    }

    h1,
    .team-title {
      font-size: 1rem;
    }

    p {
      font-size: 0.85rem;
    }

    .box-hod {
      font-size: 0.75rem;
      padding: 8px 16px;
    }

    .flow-diagram {
      gap: 10px;
    }
  }
</style>

<div class="container">
  <div class="glass-wrapper">
    <h1>Cambrian Incubation Center (CIC)</h1>
    <div class="dot-line">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="line"></div>
    </div>
    <p>
      The Cambrian Incubation Centre (CIC) is a smart initiative, established by
      <a href="https://www.cambridge.edu.in/" target="_blank">Cambridge Institute of Technology, Bangalore</a>,
      to create a vibrant ecosystem that encourages technological innovation leading to entrepreneurship and growth.
    </p>
    <p>
      Its primary objective is to provide a supportive environment to innovation-hungry
      <a href="https://msme.gov.in/" target="_blank">MSMEs</a> to the extent possible and permissible.
      It fosters creation of a collaborative environment where students (potential entrepreneurs), academic staff (as mentors), and industry experts, especially from MSMEs, can connect, share knowledge, and grow together with eligible scheme support from the
      <a href="https://msme.gov.in/" target="_blank">Ministry of MSME</a> (Govt of India).
    </p>
    <p>
      The creation of a dedicated Centre is the outcome of recognition of Cambridge Institute of Technology (Bangalore) as a Host Institution, by the
      <a href="https://dcmsme.gov.in/" target="_blank">Office of the Development Commissioner - MSME</a>, Ministry of MSME, Govt of India.
      This Centre is also supported by the
      <a href="https://coeiisc.in/" target="_blank">MSME (DCMSME) Centre of Excellence at IISc Bangalore</a>.
    </p>

    <div class="team-section">
      <div class="team-title">Incubation Team</div>
      <div class="dot-line">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="line"></div>
      </div>

      <!-- Left side team -->
      <div class="side-boxes">
        <div class="box-hod"><a href="/web-admin">Web Administrator</a></div>
        <div class="box-hod"><a href="/ops-manager">Operations Manager</a></div>
      </div>
      <div class="side-arrow"><div class="arrow-right"></div></div>

      <!-- Right side team -->
      <div class="right-boxes">
        <div class="box-hod"><a href="/advisor">Advisior-Innovation</a></div>
        <div class="arrow-up"></div>
        <div class="arrow-down"></div>
        <div class="box-hod"><a href="/msme-associates">MSME/Industry Associates</a></div>
      </div>
      <div class="right-arrow"><div class="arrow-left"></div></div>

      <div class="flow-diagram">
        <div class="box-hod"><a>All Hods</a></div>
        <div class="arrow-up"></div>
        <div class="box-hod"><a href="/head-cic">Head - CIC</a></div>
        <div class="arrow-up"></div>
        <div class="box-hod"><a href="/princi">Principal</a></div>
        <div class="arrow-up"></div>
        <div class="box-hod"><a href="/ceo">CEO</a></div>
        <div class="arrow-up"></div>
        <div class="box-hod"><a href="/chairman">Chairman</a></div>
      </div>
    </div>
  </div>
</div>
