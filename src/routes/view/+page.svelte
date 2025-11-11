<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";

  let entries = [];
  let filteredEntries = [];
  let searchQuery = "";
  let suggestions = [];
  let loading = true;

  // Default stage highlight (only Stage 1 active initially)
  let activeStage = 1;

  // Admin / HOD send functionality
  let allEntries = [];
  let studentEntries = [];
  let industryEntries = [];
  let activeTab = 'students';
  let expanded = {}; // track expanded state per field per entry
  let showStatus = {}; // NEW: to toggle project status view per entry
  let selectedEntryDetails = {}; // to hold fetched details

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

  // Fetch limited fields initially
  onMount(async () => {
    const { data, error } = await supabase
      .from("design_ideas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching data:", error);
    else {
      entries = data || [];
      filteredEntries = entries;

      allEntries = entries;

      studentEntries = allEntries
        .filter(entry => !industryKeywords.includes(entry.category))
        .map((entry, index) => ({ ...entry, number: index + 1 }));

      industryEntries = allEntries
        .filter(entry => industryKeywords.includes(entry.category))
        .map((entry, index) => ({ ...entry, number: index + 1 }));
    }
    loading = false;
  });

  // Search and suggest
  function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    if (searchQuery.trim() === "") {
      filteredEntries = entries;
      suggestions = [];
      return;
    }
    filteredEntries = entries.filter(
      (entry) =>
        entry.id.toString().includes(searchQuery) ||
        (entry.idea_title && entry.idea_title.toLowerCase().includes(searchQuery))
    );
    suggestions = filteredEntries.slice(0, 5);
  }

  function selectSuggestion(suggestion) {
    searchQuery = suggestion.idea_title;
    filteredEntries = [suggestion];
    suggestions = [];
  }

  // Toggle project status for an entry
  async function toggleStatus(entryId) {
    showStatus[entryId] = !showStatus[entryId];
    showStatus = { ...showStatus };

    if (showStatus[entryId]) {
      const { data, error } = await supabase
        .from("design_ideas")
        .select("*")
        .eq("id", entryId)
        .single();

      if (!error && data) {
        selectedEntryDetails[entryId] = data;
      }
    }
  }

  async function handleSend(entryId, sendTo, comment) {
    if (!sendTo) {
      alert("⚠ Please select a HOD before sending.");
      return;
    }

    const { error } = await supabase
      .from('design_idea_forwards')
      .insert([{ idea_id: entryId, send_to: sendTo, comment: comment || "" }]);

    if (error) {
      console.error(error);
      alert("❌ Failed to send: " + error.message);
    } else {
      alert(`✅ Entry ${entryId} successfully sent to ${sendTo}`);
    }
  }

  function toggleExpand(entryId, field) {
    expanded = { ...expanded, [entryId + field]: !expanded[entryId + field] };
  }
</script>

<style>
  .page {
    background: #fff;
    padding: 1.5rem;
    font-family: "Segoe UI", sans-serif;
    color: #222;
    min-height: 100vh;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .title { font-size: 1.5rem; font-weight: 600; color: #004080; }

  .search-box { position: relative; width: 260px; }

  input[type="search"], input[type="text"], select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }

  .suggestions { position: absolute; top: 100%; left: 0; width: 100%; background: #fff; border: 1px solid #ddd; border-radius: 0 0 8px 8px; max-height: 150px; overflow-y: auto; z-index: 10; }
  .suggestions div { padding: 8px 10px; cursor: pointer; font-size: 0.85rem; }
  .suggestions div:hover { background: #f0f6ff; }

  table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem; }
  th, td { padding: 10px; border-bottom: 1px solid #eee; text-align: left; }
  th { background-color: #004080; color: white; font-weight: 600; }
  tr { transition: background 0.2s ease; }
  tr:hover { background-color: #f5f9ff; }

  .entry-number { font-weight: bold; color: #004080; }
  .send-btn { background: #004080; color: white; padding: 5px 10px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
  .send-btn:hover { background: #002850; }

  .collapsed { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .expanded { display: block; }
  .read-more-btn { color: #004080; cursor: pointer; font-size: 0.75rem; margin-top: 4px; display: inline-block; }

  /* Inline project status block */
  .status-container {
    background: #fafafa;
    border-left: 4px solid #004080;
    margin: 0.8rem 0 1.5rem 0;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .status-title { font-size: 1rem; font-weight: 600; color: #004080; margin-bottom: 0.8rem; }
  .status-legend { display: flex; gap: 1rem; font-size: 0.85rem; margin-bottom: 0.6rem; }
  .circle { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .circle.green { background: #00a65a; }
  .circle.red { background: #d9534f; }
  .stages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
  .stage-box { background: #d9534f; color: white; border-radius: 6px; padding: 6px; font-size: 0.8rem; }
  .stage-box:first-child { background: #00a65a; box-shadow: 0 0 6px rgba(0, 150, 0, 0.3); }

  .toggle-status {
    background: none;
    border: 1px solid #004080;
    color: #004080;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .toggle-status:hover {
    background: #004080;
    color: white;
  }
</style>

<div class="page">
  <div class="header">
    <div class="title">Design Ideas</div>
    <div class="search-box">
      <input type="search" placeholder="Search by ID or Title..." on:input={handleSearch} bind:value={searchQuery} />
      {#if suggestions.length > 0}
        <div class="suggestions">
          {#each suggestions as s}
            <div on:click={() => selectSuggestion(s)}>#{s.id} — {s.idea_title}</div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div class="toggle-buttons">
    <button on:click={() => activeTab = 'students'} class:active={activeTab === 'students'}>Student Entries</button>
    <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry Entries</button>
  </div>

  {#if loading}
    <p>Loading entries...</p>
  {:else if activeTab === 'students'}
    <table>
      <thead>
        <tr>
          <th>Sl. No</th>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Send To</th>
          <th>Comments</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each studentEntries as entry}
          <tr>
            <td>{entry.number}</td>
            <td>{entry.idea_title}</td>
            <td>{entry.category}</td>
            <td>{entry.idea_description}</td>
            <td>
              <select bind:value={entry.sendTo}>
                <option value="">Send to</option>
                {#each hodList as hod}<option value={hod}>{hod}</option>{/each}
              </select>
            </td>
            <td><input type="text" placeholder="Add comments..." bind:value={entry.comment} /></td>
            <td>
              <button class="send-btn" on:click={() => handleSend(entry.id, entry.sendTo, entry.comment)}>Send</button>
              <button class="toggle-status" on:click={() => toggleStatus(entry.id)}>
                {showStatus[entry.id] ? 'Hide Status' : 'View Status'}
              </button>
            </td>
          </tr>

          {#if showStatus[entry.id]}
            <tr>
              <td colspan="7">
                <div class="status-container">
                  <div class="status-title">PROJECT STATUS</div>
                  <div class="status-legend">
                    <div><span class="circle green"></span> Completed</div>
                    <div><span class="circle red"></span> Not Completed</div>
                  </div>
                  <div class="stages-grid">
                    <div class="stage-box">Stage 1<br>Application Receipt</div>
                    <div class="stage-box">Stage 2<br>Preliminary Assessment</div>
                    <div class="stage-box">Stage 3<br>Assessment by HoD</div>
                    <div class="stage-box">Stage 4<br>Design Idea Defence</div>
                    <div class="stage-box">Stage 5<br>Proof of Concept</div>
                    <div class="stage-box">Stage 6<br>Project Progress Reviews</div>
                    <div class="stage-box">Stage 7<br>Prototype Development</div>
                    <div class="stage-box">Stage 8<br>Field Trials</div>
                    <div class="stage-box">Stage 9<br>Final Prototype</div>
                    <div class="stage-box">Completion Status</div>
                  </div>
                </div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {/if}
</div>
