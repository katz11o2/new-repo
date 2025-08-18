<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  let allEntries = [];
  let studentEntries = [];
  let industryEntries = [];
  let activeTab = 'students';

  const hodList = [
    "Mech HOD",
    "EEE HOD",
    "ECE HOD",
    "CSE HOD",
    "AIML HOD",
    "Civil HOD"
  ];

  const industryKeywords = [
    "New Product Development",
    "New Process Development",
    "New Features in Existing Product",
    "Problems in Existing Product",
    "Problems in Existing Processes"
  ];

  onMount(async () => {
    const { data, error } = await supabase
      .from('design_ideas')
      .select('*')
      .order('created_at', { ascending: false }); // Latest on top

    if (!error && data) {
      allEntries = data;

      studentEntries = allEntries
        .filter(entry => !industryKeywords.includes(entry.category))
        .map((entry, index) => ({ ...entry, number: index + 1 }));

      industryEntries = allEntries
        .filter(entry => industryKeywords.includes(entry.category))
        .map((entry, index) => ({ ...entry, number: index + 1 }));
    }
  });

  async function handleSend(entryId, sendTo, comment) {
    if (!sendTo) {
      alert("⚠️ Please select a HOD before sending.");
      return;
    }

    const { error } = await supabase
      .from('design_idea_forwards')
      .insert([
        {
          idea_id: entryId,
          send_to: sendTo,
          comment: comment || ""
        }
      ]);

    if (error) {
      console.error(error);
      alert("❌ Failed to send: " + error.message);
    } else {
      alert(`✅ Entry #${entryId} successfully sent to ${sendTo} with comment: "${comment}"`);
    }
  }
</script>

<style>
  body {
    padding-top: 50px;
    padding-bottom: 50px;
    font-family: 'Segoe UI', sans-serif;
  }

  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding-top: 2rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .toggle-buttons button {
    padding: 0.8rem 1.8rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    background-color: #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toggle-buttons button.active {
    background-color: #0070f3;
    color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .table-container {
    overflow-x: auto;
    padding: 1rem 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    background: white;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    border-radius: 12px;
    overflow: hidden;
  }

  thead {
    background: #0070f3;
    color: white;
  }

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    vertical-align: top;
    word-wrap: break-word;
    max-width: 250px;
  }

  tbody tr:hover {
    background: #f9f9f9;
  }

  th {
    font-weight: 600;
    font-size: 0.95rem;
  }

  td {
    font-size: 0.9rem;
    color: #333;
  }

  .entry-number {
    font-weight: bold;
    color: #0070f3;
  }

  select, input[type="text"] {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 0.85rem;
    width: 100%;
  }

  .send-btn {
    background: #0070f3;
    color: white;
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: 0.3s ease;
  }

  .send-btn:hover {
    background: #005bb5;
  }

  @media (max-width: 768px) {
    table {
      font-size: 0.85rem;
    }
    th, td {
      padding: 8px 10px;
    }
  }
</style>

<!-- Toggle Section -->
<div class="toggle-buttons">
  <button on:click={() => activeTab = 'students'} class:active={activeTab === 'students'}>Student Entries</button>
  <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry Entries</button>
</div>

<!-- Student Entries -->
{#if activeTab === 'students'}
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Uniqueness</th>
          <th>Existing Technologies</th>
          <th>Gap Analysis</th>
          <th>Patentability</th>
          <th>Marketing Data</th>
          <th>Visualized Product</th>
          <th>Research Data</th>
          <th>Experimental Data</th>
          <th>Other Category</th>
          <th>Send To</th>
          <th>Comments & Action</th>
        </tr>
      </thead>
      <tbody>
        {#each studentEntries as entry (entry.id)}
          <tr>
            <td class="entry-number">#{entry.number}</td>
            <td>{entry.idea_title || entry.title || 'No Title'}</td>
            <td>{entry.category}</td>
            <td>{entry.idea_description || entry.description}</td>
            <td>{entry.uniqueness}</td>
            <td>{entry.existingTechnologies}</td>
            <td>{entry.gapAnalysis}</td>
            <td>{entry.patentability}</td>
            <td>{entry.marketing_data}</td>
            <td>{entry.visualized_product}</td>
            <td>{entry.research_data}</td>
            <td>{entry.experimental_data}</td>
            <td>{entry.other_category}</td>
            <td>
              <select bind:value={entry.sendTo}>
                <option value="">Select HOD</option>
                {#each hodList as hod}
                  <option value={hod}>{hod}</option>
                {/each}
              </select>
            </td>
            <td>
              <input type="text" placeholder="Add comments..." bind:value={entry.comment} />
              <button class="send-btn" on:click={() => handleSend(entry.id, entry.sendTo, entry.comment)}>Send</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <!-- Industry Entries -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Uniqueness</th>
          <th>Existing Tech</th>
          <th>Gap Analysis</th>
          <th>Patentability</th>
          <th>Market Data</th>
          <th>Financials</th>
          <th>Visualized Product</th>
          <th>Send To</th>
          <th>Comments & Action</th>
        </tr>
      </thead>
      <tbody>
        {#each industryEntries as entry (entry.id)}
          <tr>
            <td class="entry-number">#{entry.number}</td>
            <td>{entry.title || entry.idea_title || 'No Title'}</td>
            <td>{entry.category}</td>
            <td>{entry.description || entry.idea_description}</td>
            <td>{entry.uniqueness}</td>
            <td>{entry.existingTech}</td>
            <td>{entry.gapAnalysis}</td>
            <td>{entry.patentability}</td>
            <td>{entry.marketData}</td>
            <td>{entry.financials}</td>
            <td>{entry.visualized_product}</td>
            <td>
              <select bind:value={entry.sendTo}>
                <option value="">Select HOD</option>
                {#each hodList as hod}
                  <option value={hod}>{hod}</option>
                {/each}
              </select>
            </td>
            <td>
              <input type="text" placeholder="Add comments..." bind:value={entry.comment} />
              <button class="send-btn" on:click={() => handleSend(entry.id, entry.sendTo, entry.comment)}>Send</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
