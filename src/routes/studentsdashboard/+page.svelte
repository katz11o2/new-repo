<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let user = null;
  let idea_title = '';
  let idea_description = '';
  let submissions = [];

  // Check auth and fetch submissions
  onMount(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      goto('/');
      return;
    }

    user = session.user;
    await fetchSubmissions();
  });

  async function submitIdea() {
    if (!idea_title || !idea_description) {
      alert('Please fill in all fields.');
      return;
    }

    const { error } = await supabase.from('design_ideas').insert([
      {
        name: user.user_metadata.full_name || user.email,
        email: user.email,
        idea_title,
        idea_description,
        user_id: user.id
      }
    ]);

    if (error) {
      console.error('Submission failed:', error.message);
      alert('Submission failed');
    } else {
      alert('Idea submitted successfully!');
      idea_title = '';
      idea_description = '';
      await fetchSubmissions();
    }
  }

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from('design_ideas')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch submissions:', error.message);
    } else {
      submissions = data;
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<style>
  .input { @apply border p-2 rounded w-full mb-4; }
  .btn { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700; }
</style>

<main class="max-w-2xl mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
    <button class="btn" on:click={signOut}>Logout</button>
  </div>

  <div class="bg-white shadow p-4 rounded mb-6">
    <h2 class="text-xl font-semibold mb-4">Submit Your Design Idea</h2>
    <input class="input" type="text" placeholder="Idea Title" bind:value={idea_title} />
    <textarea class="input" rows="4" placeholder="Idea Description" bind:value={idea_description}></textarea>
    <button class="btn" on:click={submitIdea}>Submit</button>
  </div>

  <div class="bg-white shadow p-4 rounded">
    <h2 class="text-xl font-semibold mb-4">Your Submissions</h2>
    {#if submissions.length === 0}
      <p>No submissions yet.</p>
    {:else}
      <ul>
        {#each submissions as sub}
          <li class="mb-4 border-b pb-2">
            <h3 class="font-bold">{sub.idea_title}</h3>
            <p>{sub.idea_description}</p>
            <small class="text-gray-500">Submitted on {new Date(sub.created_at).toLocaleString()}</small>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
