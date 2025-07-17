<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let submissions = [];
  let userEmail = '';

  onMount(async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('You must be logged in to view your dashboard.');
      window.location.href = '/';
      return;
    }

    userEmail = user.email;

    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('email', userEmail);

    if (error) {
      console.error('Failed to fetch submissions:', error);
    } else {
      submissions = data;
    }
  });
</script>

<style>
  .dashboard {
    max-width: 900px;
    margin: 3rem auto;
    font-family: 'Poppins', sans-serif;
  }

  h2 {
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 2rem;
  }

  .card {
    background: #f9fafb;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    margin-bottom: 1.5rem;
    transition: 0.3s;
  }

  .card:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .heading {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1e40af;
  }

  .field {
    margin: 0.3rem 0;
    font-size: 0.95rem;
  }

  .field strong {
    color: #475569;
  }
</style>

<div class="dashboard">
  <h2>Welcome, {userEmail}</h2>

  {#if submissions.length === 0}
    <p>No submissions found for your account.</p>
  {:else}
    {#each submissions as item}
      <div class="card">
        <div class="heading">{item.title}</div>
        <div class="field"><strong>Category:</strong> {item.category}</div>
        <div class="field"><strong>Description:</strong> {item.description}</div>
        <div class="field"><strong>Uniqueness:</strong> {item.uniqueness}</div>
        <div class="field"><strong>Research:</strong> {item.researchData}</div>
        <div class="field"><strong>Marketing:</strong> {item.Marketingdata}</div>
      </div>
    {/each}
  {/if}
</div>
