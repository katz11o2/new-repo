<script>
  let name = '';
  let email = '';
  let phone = '';
  let industry = '';
  let queryType = 'Submission of Problem Statement';
  let description = '';
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #ffffff;
  }

  .page {
    padding: 4rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    min-height: 100vh;
  }

  .heading {
    text-align: center;
    margin-bottom: 3rem;
  }

  .heading h1 {
    font-size: 3rem;
    color: #101820;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }

  .heading h2 {
    font-size: 1.4rem;
    font-weight: 400;
    color: #505050;
  }

  .heading p {
    color: #666;
    max-width: 700px;
    margin: 1rem auto 0;
    font-size: 1rem;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
  }

  .card {
    flex: 1 1 360px;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(40px);
    animation: popUp 0.6s ease forwards;
  }

  .card:nth-child(2) {
    animation-delay: 0.2s;
  }

  @keyframes popUp {
    to {
      transform: translateY(0);
    }
  }

  /* Left Card: Contact Info */
  .left h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #1e1e1e;
  }

  .left p {
    font-size: 1rem;
    color: #333;
    margin: 0.3rem 0;
  }

  /* Right Card: Form */
  form {
    display: grid;
    gap: 1.2rem;
  }

  .form-field {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .form-field input,
  .form-field select,
  .form-field textarea {
    padding: 1rem;
    border: none;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: inset 0 0 0 1px #ccc;
    font-size: 1rem;
    transition: box-shadow 0.2s ease;
  }

  .form-field input:focus,
  .form-field textarea:focus,
  .form-field select:focus {
    box-shadow: inset 0 0 0 2px #0077ff;
    outline: none;
  }

  .form-field label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #222;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button {
    padding: 0.9rem;
    font-size: 1rem;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    background: linear-gradient(135deg, #0077ff, #00c6ff);
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 119, 255, 0.3);
  }
</style>

<div class="page">
  <div class="heading">
    <h1>Connect With Us</h1>
    <h2>Let's Build The Future Together</h2>
    <p>Whether you're looking to collaborate or have an innovative idea, we're here to help.</p>
  </div>

  <div class="container">
    <!-- Left Card -->
    <div class="card left">
      <h3>Contact Us</h3>
      <p><strong>Dr. Varalatchoumy M</strong></p>
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
      <form on:submit|preventDefault={() => alert('Form submitted!')}>
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
