<script>
  // No scripting needed
</script>

<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: white;
  }

  .msme-link {
    color: #2563eb;
    text-decoration: underline;
  }

  .msme-link:hover {
    color: #1d4ed8;
  }
</style>

<!-- Outer wrapper -->
<div class="min-h-screen flex flex-col items-center justify-center px-10 bg-white space-y-10">

  <!-- Glassmorphic box -->
  <div class="backdrop-blur-lg bg-white/40 border-2 border-blue-500 shadow-xl rounded-[20px] w-full max-w-4xl p-10 text-gray-900">
    <h1 class="text-3xl font-semibold text-center text-blue-700 mb-6">
      Cambrian Incubation Center (CIC)
    </h1>
    <p class="text-justify">
      The Cambrian Incubation Centre (CIC) is a smart initiative, established by 
      <a href="https://engg.cambridge.edu.in/" target="_blank" class="msme-link">Cambridge Institute of Technology</a>, Bangalore, to create a vibrant ecosystem that encourages technological innovation leading to entrepreneurship and growth. Its primary objective is to provide a supportive environment to innovation-hungry 
      <a href="https://msme.gov.in/" target="_blank" class="msme-link">MSMEs</a> to the extent possible and permissible. It fosters creation of a collaborative environment where students (potential entrepreneurs), academic staff (as mentors), and industry experts, especially from 
      <a href="https://msme.gov.in/" target="_blank" class="msme-link">MSMEs</a>, can connect, share knowledge, and grow together with eligible scheme support from the 
      <a href="https://msme.gov.in/" target="_blank" class="msme-link">Ministry of MSME (Govt of India)</a>. The creation of a dedicated Centre is the outcome of recognition of Cambridge Institute of Technology (Bangalore) as a 
      <a href="https://www.dcmsme.gov.in/" target="_blank" class="msme-link">Host Institution</a>, by the Office of the Development Commissioner - MSME, 
      <a href="https://msme.gov.in/" target="_blank" class="msme-link">Ministry of MSME</a>, Govt of India. This Centre is also supported by the 
      <a href="https://msme.gov.in/" target="_blank" class="msme-link">MSME</a> 
      <a href="https://www.dcmsme.gov.in/" target="_blank" class="msme-link">(DCMSME) Centre of Excellence</a> IISc, Bangalore. This Centre would provide several facilities like Incubation Space (having office space, meeting rooms, internet, etc), Mentorship (connect with learned faculty), exposure to cutting-edge technologies (through participation in events like awareness programs and workshops), laboratories (for experimentation, etc).
    </p>
  </div>

  <!-- Flowchart -->
  <div class="flex flex-col items-center space-y-4 text-center text-lg font-medium text-gray-800">

    <div class="bg-blue-100 px-6 py-2 rounded shadow">Chairman</div>
    <div class="text-2xl text-blue-500">↑</div>

    <div class="bg-blue-100 px-6 py-2 rounded shadow">CEO</div>
    <div class="text-2xl text-blue-500">↑</div>

    <div class="bg-blue-100 px-6 py-2 rounded shadow">Principal</div>
    <div class="text-2xl text-blue-500">↑</div>

    <!-- Head - CIC with both side connections -->
    <div class="relative w-full flex justify-center items-center">

      <!-- Left side: Web Admin + Operation Manager -->
      <div class="absolute -left-64 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        <div class="flex flex-col items-end space-y-4">
          <div class="bg-blue-100 px-4 py-1 rounded shadow">Web Admin</div>
          <div class="bg-blue-100 px-4 py-1 rounded shadow">Operation Manager</div>
        </div>
        <div class="text-blue-500 text-2xl">→</div>
      </div>

      <!-- Head - CIC -->
      <div class="bg-blue-100 px-6 py-2 rounded shadow z-10">Head - CIC</div>

      <!-- Right side: Advisor - Innovation -->
      <div class="absolute -right-64 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        <div class="text-blue-500 text-2xl">→</div>
        <div class="bg-blue-100 px-4 py-1 rounded shadow">Advisor - Innovation</div>
      </div>
    </div>

    <div class="text-2xl text-blue-500">↑</div>
    <div class="bg-blue-100 px-6 py-2 rounded shadow">All HODs</div>

  </div>
</div>
