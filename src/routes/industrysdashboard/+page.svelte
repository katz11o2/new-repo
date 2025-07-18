<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let loading = false;
  let error = '';
  let success = '';
  let file = null;

  let form = {
    idea_title: '',
    category: '',
    idea_description: '',
    existingTechnologies: '',
    technologyDifferentiation: '',
    targetCustomers: '',
    targetMarket: '',
    visualized_product: ''
  };

  // Get the current user
  onMount(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) goto('/');
    user = currentUser;
  });

  async function handleFileUpload() {
    if (!file) return '';

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { data, error: uploadError } = await supabase
      .storage
      .from('submissions') // Replace with your actual bucket name
      .upload(filePath, file);

    if (uploadError) {
      error = 'File upload failed.';
      console.error(uploadError);
      return '';
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('submissions')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }

  async function handleSubmit() {
    loading = true;
    error = '';
    success = '';

    const fileUrl = await handleFileUpload();
    form.visualized_product = fileUrl;

    const { data, error: insertError } = await supabase
      .from('design_ideas')
      .insert([{ ...form, user_id: user.id }]);

    if (insertError) {
      error = 'Submission failed. Please try again.';
      console.error(insertError);
    } else {
      success = 'Idea submitted successfully!';
      form = {
        idea_title: '',
        category: '',
        idea_description: '',
        existingTechnologies: '',
        technologyDifferentiation: '',
        targetCustomers: '',
        targetMarket: '',
        visualized_product: ''
      };
      file = null;
    }

    loading = false;
  }
</script>

<style>
  .glass-box {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 2rem;
    max-width: 800px;
    margin: 2rem auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(15px);
    color: white;
  }

  input, textarea, select {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.75rem;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    background: #4f46e5;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover {
    background: #4338ca;
  }

  .status-message {
    margin-top: 1rem;
    font-weight: bold;
  }
</style>

<div class="glass-box">
  <h2 class="text-2xl font-bold mb-4 text-center">Industry Submission Form</h2>

  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Idea Title" bind:value={form.idea_title} required />
    <input type="text" placeholder="Category" bind:value={form.category} required />
    <textarea placeholder="Idea Description" bind:value={form.idea_description} rows="3" required></textarea>
    <textarea placeholder="Existing Technologies" bind:value={form.existingTechnologies} rows="2" required></textarea>
    <textarea placeholder="Technology Differentiation" bind:value={form.technologyDifferentiation} rows="2" required></textarea>
    <textarea placeholder="Target Customers" bind:value={form.targetCustomers} rows="2" required></textarea>
    <textarea placeholder="Target Market" bind:value={form.targetMarket} rows="2" required></textarea>

    <label class="block mt-2">Upload Visualized Product (PDF/Image)</label>
    <input type="file" accept=".pdf,.png,.jpg,.jpeg" on:change={(e) => file = e.target.files[0]} />

    <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Idea'}</button>

    {#if error}
      <div class="status-message text-red-500">{error}</div>
    {/if}
    {#if success}
      <div class="status-message text-green-400">{success}</div>
    {/if}
  </form>
</div>
