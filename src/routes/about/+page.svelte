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
    justify-content: center;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
  }

  .glass-box {
    max-width: 800px;
    width: 100%;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #93c5fd;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    color: #000;
    text-align: center;
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

  h1 {
    color: #1e3a8a;
    margin-bottom: 20px;
  }

  p {
    text-align: justify;
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 16px;
  }

  a {
    color: #2563eb;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #1d4ed8;
  }

  @media (max-width: 600px) {
    .glass-box {
      padding: 20px;
    }
  }
</style>

<div class="container">
  <div class="glass-box">
    <h1>Cambrian Incubation Center (CIC)</h1>
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
  </div>
</div>
