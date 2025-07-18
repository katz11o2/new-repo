  <script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    let user = null;
    let studentEntries = [];
    let industryEntries = [];
    let error = '';
    let loading = false;

    // Fetch submissions separately for student and industry
    async function fetchEntries() {
      loading = true;

      // Fetch student entries
      const { data: studentData, error: studentError } = await supabase
        .from('design_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (studentError) {
        error = 'Error fetching student submissions.';
        console.error(studentError);
      } else {
        studentEntries = studentData;
      }

      // Fetch industry entries
      const { data: industryData, error: industryError } = await supabase
        .from('industry_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (industryError) {
        error = 'Error fetching industry submissions.';
        console.error(industryError);
      } else {
        industryEntries = industryData;
      }

      loading = false;
    }

    onMount(async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        goto('/');
        return;
      }

      user = session.user;
      await fetchEntries();
    });
  </script>

  <style>
    .section {
      margin: 2rem 0;
    }

    .card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 1rem;
      padding: 1.5rem;
      margin: 1rem 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      margin-top: 1.5rem;
    }

    .loading {
      text-align: center;
      margin-top: 3rem;
      font-size: 1.25rem;
    }
  </style>

  {#if loading}
    <div class="loading">Loading submissions...</div>
  {:else}
    <div class="section">
      <h2>🎓 Student Submissions</h2>
      {#if studentEntries.length === 0}
        <p>No student submissions found.</p>
      {:else}
        {#each studentEntries as sub}
          <div class="card">
            <h3>{sub.idea_title || sub.title}</h3>
            <p><strong>Category:</strong> {sub.category}</p>
            <p><strong>Description:</strong> {sub.idea_description || sub.description}</p>
            <p><strong>Uniqueness:</strong> {sub.uniqueness}</p>
            <p><strong>Existing Tech:</strong> {sub.existingTechnologies}</p>
            <p><strong>Market Data:</strong> {sub.marketData}</p>
            <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
            <p><strong>Submitted at:</strong> {new Date(sub.created_at).toLocaleString()}</p>
          </div>
        {/each}
      {/if}
    </div>

    <div class="section">
      <h2>🏭 Industry Submissions</h2>
      {#if industryEntries.length === 0}
        <p>No industry submissions found.</p>
      {:else}
        {#each industryEntries as sub}
          <div class="card">
            <h3>{sub.idea_title || sub.title}</h3>
            <p><strong>Category:</strong> {sub.category}</p>
            <p><strong>Description:</strong> {sub.idea_description || sub.description}</p>
            <p><strong>Market Data:</strong> {sub.marketData}</p>
            <p><strong>Visualized Product:</strong> {sub.visualized_product}</p>
            <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
            <p><strong>Submitted at:</strong> {new Date(sub.created_at).toLocaleString()}</p>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
