<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let activeTab = 'students';
  let students = [];
  let industries = [];

  const fetchData = async () => {
    const { data: studentData } = await supabase.from('student_ideas').select('*').order('created_at', { ascending: false });
    const { data: industryData } = await supabase.from('industry_ideas').select('*').order('created_at', { ascending: false });
    students = studentData || [];
    industries = industryData || [];
  };

  onMount(fetchData);
</script>

<style>
  .glass-card {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    max-width: 1000px;
    margin: auto;
  }

  .tab-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 1rem;
    background: #fff;
    cursor: pointer;
    margin: 0.5rem;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: all 0.3s;
  }

  .tab-button.active {
    background-color: #007bff;
    color: white;
  }

  table {
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #f0f0f0;
  }

  @media screen and (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }

    td {
      position: relative;
      padding-left: 50%;
    }

    td::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 45%;
      padding-left: 1rem;
      white-space: nowrap;
    }
  }
</style>

<main class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center justify-center">
  <div class="glass-card">
    <h1 class="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

    <div class="flex justify-center mb-4">
      <button class="tab-button {activeTab === 'students' ? 'active' : ''}" on:click={() => activeTab = 'students'}>Student Entries</button>
      <button class="tab-button {activeTab === 'industries' ? 'active' : ''}" on:click={() => activeTab = 'industries'}>Industry Entries</button>
    </div>

    {#if activeTab === 'students'}
      <h2 class="text-xl font-semibold mb-2">Student Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>College</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {#each students as sub}
            <tr>
              <td>{sub.idea_title || sub.title}</td>
              <td>{sub.category}</td>
              <td>{sub.college}</td>
              <td>{new Date(sub.created_at).toLocaleString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <h2 class="text-xl font-semibold mb-2">Industry Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Company</th>
            <th>MSME No</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {#each industries as sub}
            <tr>
              <td>{sub.idea_title || sub.title}</td>
              <td>{sub.category}</td>
              <td>{sub.company}</td>
              <td>{sub.msme_number}</td>
              <td>{new Date(sub.created_at).toLocaleString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</main>
