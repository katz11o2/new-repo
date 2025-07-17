<script>
  import { onMount } from "svelte";

  let form = {
    title: "",
    category: "",
    description: "",
    uniqueness: "",
    existingTechnologies: "",
    gapAnalysis: "",
    patentability: "",
    Marketingdata: "",
    visualizedProduct: "",
    researchData: "",
    experimentalData: "",
    otherCategory: "",
    confirmSubmission: false,
  };

  let showPopup = false;

  const handleSubmit = () => {
    if (!form.confirmSubmission) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    // Handle form submission here
    console.log(form);
  };
</script>

<style>
  .glass-box {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    padding: 30px;
    max-width: 800px;
    margin: 40px auto;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #000;
  }

  input::placeholder,
  textarea::placeholder {
    color: #333;
  }

  .checkbox {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .checkbox input {
    margin-right: 10px;
    transform: scale(1.2);
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup-content {
    background: rgba(255, 255, 255, 0.15);
    padding: 25px;
    border-radius: 15px;
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
  }

  .popup-content p {
    color: #fff;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    background: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
  }

  button {
    padding: 10px 20px;
    background: #007aff;
    color: #fff;
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    cursor: pointer;
  }
</style>

<div class="glass-box">
  <h2>Submit Your Idea</h2>

  <input type="text" bind:value={form.title} placeholder="Title" />
  <input type="text" bind:value={form.category} placeholder="Category" />
  <textarea bind:value={form.description} placeholder="Description"></textarea>
  <textarea bind:value={form.uniqueness} placeholder="Uniqueness"></textarea>
  <textarea bind:value={form.existingTechnologies} placeholder="Existing Technologies"></textarea>
  <textarea bind:value={form.gapAnalysis} placeholder="Gap Analysis"></textarea>
  <textarea bind:value={form.patentability} placeholder="Patentability"></textarea>
  <textarea bind:value={form.Marketingdata} placeholder="Marketing Data"></textarea>
  <textarea bind:value={form.visualizedProduct} placeholder="Visualized Product"></textarea>
  <textarea bind:value={form.researchData} placeholder="Research Data"></textarea>
  <textarea bind:value={form.experimentalData} placeholder="Experimental Data"></textarea>
  <input type="text" bind:value={form.otherCategory} placeholder="Other Category" />

  <div class="checkbox">
    <input
      type="checkbox"
      bind:checked={form.confirmSubmission}
      on:click={() => (showPopup = true)}
    />
    <label>I agree to the Terms and Conditions</label>
  </div>

  <button on:click={handleSubmit}>Submit</button>
</div>

{#if showPopup}
  <div class="popup">
    <div class="popup-content">
      <button class="close-btn" on:click={() => (showPopup = false)}>Close</button>
      <h3>Terms and Conditions</h3>
      <p>
        By submitting this form, you agree that all the provided data is accurate and legally yours
        to submit. This platform is not liable for any disputes. You consent to your submission being
        stored and potentially reviewed for innovation, compliance, or internal review purposes.
      </p>
    </div>
  </div>
{/if}
