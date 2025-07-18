<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let studentEntries = [];
  let industryEntries = [];
  let activeTab = 'student';

  const fetchSubmissions = async () => {
    const { data, error } = await supabase.from('design_ideas').select('*');

    if (error) {
      console.error(error);
    } else {
      studentEntries = data.filter(sub => sub.user_type === 'student');
      industryEntries = data.filter(sub => sub.user_type === 'industry');
    }
  };

  onMount(() => {
    fetchSubmissions();
  });
</script>

<style>
  .tab-btn {
    @apply px-4 py-2 bg-white rounded-xl shadow-sm border text-gray-700 hover:bg-gray-200;
  }
  .tab-btn.active {
    @apply bg-blue-500 text-white;
  }
</style>

<div class="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-4">
  <div class="glass w-full max-w-5xl p-6 rounded-2xl shadow-xl">
    <h1 class="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

    <div class="flex gap-4 justify-center mb-6">
      <button class="tab-btn {activeTab === 'student' ? 'active' : ''}" on:click={() => activeTab = 'student'}>Student Entries</button>
      <button class="tab-btn {activeTab === 'industry' ? 'active' : ''}" on:click={() => activeTab = 'industry'}>Industry Entries</button>
    </div>

    {#if activeTab === 'student'}
      <h2 class="text-xl font-semibold mb-2">Student Submissions</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 border">Title</th>
              <th class="p-2 border">Category</th>
              <th class="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {#each studentEntries as sub}
              <tr>
                <td class="p-2 border">{sub.idea_title}</td>
                <td class="p-2 border">{sub.category}</td>
                <td class="p-2 border">{sub.description}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <h2 class="text-xl font-semibold mb-2">Industry Submissions</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 border">Title</th>
              <th class="p-2 border">Category</th>
              <th class="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {#each industryEntries as sub}
              <tr>
                <td class="p-2 border">{sub.idea_title}</td>
                <td class="p-2 border">{sub.category}</td>
                <td class="p-2 border">{sub.description}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<style>
  .glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
</style>
