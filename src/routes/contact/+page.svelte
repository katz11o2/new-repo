<script>
  let name = '';
  let email = '';
  let phone = '';
  let industry = '';
  let queryType = 'Submission of Problem Statement';
  let description = '';

  function sendMail() {
    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Industry: ${industry}
Query Type: ${queryType}
Description: ${description}
    `.trim();

    const mailtoLink = `mailto:choss@cambridge.edu.in?subject=New Query from Website&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(to right, #f8faff, #eef5ff);
  }

  .page {
    padding: 2rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }

  .heading {
    text-align: center;
    margin-bottom: 2rem;
    animation: fadeSlideUp 0.8s ease both;
  }

  .heading h1 {
    font-size: 2rem;
    color: #101820;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .heading h2 {
    font-size: 1rem;
    font-weight: 400;
    color: #505050;
  }

  .heading p {
    color: #555;
    max-width: 600px;
    margin: 1rem auto 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    max-width: 900px;
    animation: fadeSlideUp 1.2s ease both;
  }

  .card {
    flex: 1 1 280px;
    padding: 1.2rem;
    background: #ffffffaa;
    border-radius: 14px;
    backdrop-filter: blur(14px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeSlideUp 0.8s ease forwards;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
  }

  .left h3 {
    margin-bottom: 0.8rem;
    font-size: 1rem;
    color: #1e1e1e;
  }

  ::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    color: #999;
    opacity: 1;
  }

  .left p {
    font-size: 0.9rem;
    color: #333;
    margin: 0.3rem 0;
  }

  form {
    display: grid;
    gap: 1rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  .form-field label {
    margin-bottom: 0.3rem;
    font-weight: 600;
    color: #222;
    font-size: 0.85rem;
  }

  .form-field input,
  .form-field select,
  .form-field textarea {
    padding: 0.6rem 0.8rem;
    border: none;
    border-radius: 10px;
    background: #f9f9f9;
    font-size: 0.9rem;
    transition: box-shadow 0.2s ease, background 0.3s;
    box-shadow: inset 0 0 0 1px #ccc;
  }

  .form-field input:focus,
  .form-field select:focus,
  .form-field textarea:focus {
    box-shadow: inset 0 0 0 2px #0077ff;
    background: #fff;
    outline: none;
  }

  textarea {
    resize: vertical;
    min-height: 60px;
  }

  button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    border-radius: 10px;
    font-weight: 600;
    background: linear-gradient(135deg, #0077ff, #00c6ff);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }

  button:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 119, 255, 0.25);
  }

  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>


<div class="page">
  <div class="heading">
    <h1>We can Build The Future Together</h1>
    <p>Whether you're looking to collaborate or have an innovative idea, we're here to help.</p>
  </div>

  <div class="container">
    <!-- Left Card -->
    <div class="card left">
      <h3>Contact Us</h3>
      <p><strong>Mr. Arun Singh</strong></p>
      <p>📧 choss@cambridge.edu.in</p>
      <p>📞 +91 95355 17571</p>

      <h3 style="margin-top: 2rem;">Visit Us</h3>
      <p>Chikkabasavanapura, Krishnarajapuram</p>
      <p>Bengaluru - 560036</p>

      <h3 style="margin-top: 2rem;">⏰ Working Hours</h3>
      <p>Mon - Fri, 9:00 AM - 4:00 PM</p>
    </div>

    <!-- Right Card: Form -->
    <div class="card right">
      <form on:submit|preventDefault={sendMail}>
        <div class="form-field">
          <label for="name">Name</label>
          <input id="name" bind:value={name} placeholder="Your Name" required />
        </div>

        <div class="form-field">
          <label for="email">Email</label>
          <input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
        </div>

        <div class="form-field">
          <label for="phone">Phone</label>
          <input id="phone" type="tel" bind:value={phone} placeholder="9916455287" required />
        </div>

        <div class="form-field">
          <label for="industry">Industry</label>
          <input id="industry" bind:value={industry} placeholder="e.g. IT, Education" />
        </div>

        <div class="form-field">
          <label for="query">Type of Query</label>
          <select id="query" bind:value={queryType}>
            <option>Submission of Problem Statement</option>
            <option>Collaboration</option>
            <option>General Inquiry</option>
          </select>
        </div>

        <div class="form-field">
          <label for="desc">Description</label>
          <textarea id="desc" bind:value={description} placeholder="Describe your query..."></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
