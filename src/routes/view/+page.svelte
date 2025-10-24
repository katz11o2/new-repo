<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";

  let entries = [];
  let filteredEntries = [];
  let searchQuery = "";
  let suggestions = [];
  let loading = true;
  let selectedEntry = null;
  let showModal = false;

  // Default stage highlight (only Stage 1 active initially)
  let activeStage = 1;

  // Admin / HOD send functionality
  let allEntries = [];
  let studentEntries = [];
  let industryEntries = [];
  let activeTab = 'students';
  let expanded = {}; // track expanded state per field per entry

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

  // Fetch all fields for a selected entry
  async function openDetails(entryId) {
    const { data, error } = await supabase
      .from("design_ideas")
      .select("*")
      .eq("id", entryId)
      .single();

    if (error) {
      console.error("Error fetching full details:", error);
      alert("Failed to load details.");
      return;
    }

    selectedEntry = data;
    showModal = true;
    activeStage = 1; // Reset glowing stage for now
  }

  function closeModal() {
    showModal = false;
    selectedEntry = null;
  }

  async function handleSend(entryId, sendTo, comment) {
    if (!sendTo) {
      alert("⚠ Please select a HOD before sending.");
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
      alert(`✅ Entry ${entryId} successfully sent to ${sendTo} with comment: "${comment}"`);
    }
  }

  function toggleExpand(entryId, field) {
    expanded = { ...expanded, [entryId + field]: !expanded[entryId + field] };
  }
</script>

<style>
  /* ----- Existing styles from both codes merged ----- */
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

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #004080;
  }

  .search-box {
    position: relative;
    width: 260px;
  }

  input[type="search"], input[type="text"], select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.2s ease;
  }

  input[type="search"]:focus, input[type="text"]:focus, select:focus {
    border-color: #004080;
    box-shadow: 0 0 4px rgba(0, 64, 128, 0.2);
  }

  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
  }

  .suggestions div {
    padding: 8px 10px;
    cursor: pointer;
    font-size: 0.85rem;
  }

  .suggestions div:hover {
    background: #f0f6ff;
  }

  /* Table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 0.9rem;
    table-layout: auto;
  }

  th, td {
    padding: 10px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  th {
    background-color: #004080;
    color: white;
    font-weight: 600;
  }

  tr {
    cursor: pointer;
    transition: background 0.2s ease;
  }

  tr:hover {
    background-color: #f5f9ff;
  }

  /* Modal styling */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .modal {
    background: #fff;
    padding: 1.5rem;
    border-radius: 10px;
    width: 90%;
    max-width: 900px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .modal-header h2 {
    font-size: 1.2rem;
    color: #004080;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    color: #555;
  }

  /* Project Status Flow */
  .project-status { margin-top: 2rem; text-align: center; }
  .status-title { font-size: 1.1rem; font-weight: 600; color: #004080; margin-bottom: 1rem; }
  .status-legend { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; margin-bottom: 8px; font-size: 0.85rem; }
  .status-legend div { display: flex; align-items: center; gap: 6px; }
  .circle { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .circle.green { background-color: #00a65a; }
  .circle.red { background-color: #d9534f; }
  .stages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; justify-items: center; }
  .stage-box { border: 1px solid #ccc; border-radius: 6px; padding: 8px; width: 100%; background-color: #d9534f; color: white; font-size: 0.85rem; }
  .stage-box:first-child { background-color: #00a65a; box-shadow: 0 0 8px rgba(0, 150, 0, 0.3); }
  .stage-box small { display: block; margin-top: 4px; font-size: 0.8rem; color: #fff; }

  .toggle-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    padding-top: 1rem;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .toggle-buttons button {
    padding: 0.6rem 1.4rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    background-color: #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.85rem;
  }

  .toggle-buttons button.active {
    background-color: #004080;
    color: white;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  }

  .entry-number { font-weight: bold; color: #004080; }
  .send-btn { background: #004080; color: white; padding: 5px 10px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: 0.3s ease; }
  .send-btn:hover { background: #002850; }
  .collapsed { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .expanded { display: block; }
  .read-more-btn { color: #004080; cursor: pointer; font-size: 0.75rem; margin-top: 4px; display: inline-block; }
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

  <!-- Admin Toggle Section -->
  <div class="toggle-buttons">
    <button on:click={() => activeTab = 'students'} class:active={activeTab === 'students'}>Student Entries</button>
    <button on:click={() => activeTab = 'industry'} class:active={activeTab === 'industry'}>Industry Entries</button>
  </div>

  {#if loading}
    <p>Loading entries...</p>
  {:else if filteredEntries.length === 0}
    <p>No results found.</p>
  {:else if activeTab === 'students'}
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
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
              <td class="entry-number">{entry.number}</td>
              <td>
                <div class={expanded[entry.id + 'title'] ? 'expanded' : 'collapsed'}>
                  {entry.idea_title || entry.title || 'No Title'}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'title')}>
                  {expanded[entry.id + 'title'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>{entry.category}</td>
              <td>
                <div class={expanded[entry.id + 'desc'] ? 'expanded' : 'collapsed'}>
                  {entry.idea_description || entry.description}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'desc')}>
                  {expanded[entry.id + 'desc'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <!-- Other student entry columns (uniqueness, existingTech, etc.) -->
              <td>
                <div class={expanded[entry.id + 'uniq'] ? 'expanded' : 'collapsed'}>
                  {entry.uniqueness}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'uniq')}>
                  {expanded[entry.id + 'uniq'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'existTech'] ? 'expanded' : 'collapsed'}>
                  {entry.existingTechnologies}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'existTech')}>
                  {expanded[entry.id + 'existTech'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'gap'] ? 'expanded' : 'collapsed'}>
                  {entry.gapAnalysis}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'gap')}>
                  {expanded[entry.id + 'gap'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'patent'] ? 'expanded' : 'collapsed'}>
                  {entry.patentability}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'patent')}>
                  {expanded[entry.id + 'patent'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'market'] ? 'expanded' : 'collapsed'}>
                  {entry.marketing_data}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'market')}>
                  {expanded[entry.id + 'market'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'visual'] ? 'expanded' : 'collapsed'}>
                  {entry.visualized_product}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'visual')}>
                  {expanded[entry.id + 'visual'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'research'] ? 'expanded' : 'collapsed'}>
                  {entry.research_data}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'research')}>
                  {expanded[entry.id + 'research'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'expdata'] ? 'expanded' : 'collapsed'}>
                  {entry.experimental_data}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'expdata')}>
                  {expanded[entry.id + 'expdata'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <div class={expanded[entry.id + 'other'] ? 'expanded' : 'collapsed'}>
                  {entry.other_category}
                </div>
                <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'other')}>
                  {expanded[entry.id + 'other'] ? 'Read Less' : 'Read More'}
                </span>
              </td>
              <td>
                <select bind:value={entry.sendTo}>
                  <option value="">Send to</option>
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
  <!-- Industry Entries (same pattern) -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Sl. No</th>
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
            <td class="entry-number">{entry.number}</td>
            <td>
              <div class={expanded[entry.id + 'title'] ? 'expanded' : 'collapsed'}>
                {entry.title || entry.idea_title || 'No Title'}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'title')}>
                {expanded[entry.id + 'title'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>{entry.category}</td>
            <td>
              <div class={expanded[entry.id + 'desc'] ? 'expanded' : 'collapsed'}>
                {entry.description || entry.idea_description}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'desc')}>
                {expanded[entry.id + 'desc'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <!-- Remaining industry fields (uniq, existTech, gap, patent, market, fin, visual) -->
            <td>
              <div class={expanded[entry.id + 'uniq'] ? 'expanded' : 'collapsed'}>
                {entry.uniqueness}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'uniq')}>
                {expanded[entry.id + 'uniq'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <div class={expanded[entry.id + 'existTech'] ? 'expanded' : 'collapsed'}>
                {entry.existingTech}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'existTech')}>
                {expanded[entry.id + 'existTech'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <div class={expanded[entry.id + 'gap'] ? 'expanded' : 'collapsed'}>
                {entry.gapAnalysis}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'gap')}>
                {expanded[entry.id + 'gap'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <div class={expanded[entry.id + 'patent'] ? 'expanded' : 'collapsed'}>
                {entry.patentability}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'patent')}>
                {expanded[entry.id + 'patent'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <div class={expanded[entry.id + 'market'] ? 'expanded' : 'collapsed'}>
                {entry.marketData}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'market')}>
                {expanded[entry.id + 'market'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <div class={expanded[entry.id + 'fin'] ? 'expanded' : 'collapsed'}>
                {entry.financials}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'fin')}>
                {expanded[entry.id + 'fin'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <div class={expanded[entry.id + 'visual'] ? 'expanded' : 'collapsed'}>
                {entry.visualized_product}
              </div>
              <span class="read-more-btn" on:click={() => toggleExpand(entry.id, 'visual')}>
                {expanded[entry.id + 'visual'] ? 'Read Less' : 'Read More'}
              </span>
            </td>
            <td>
              <select bind:value={entry.sendTo}>
                <option value="">Send to</option>
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

<!-- Modal for selected entry -->
{#if showModal && selectedEntry}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h2>Idea #{selectedEntry.id}</h2>
        <button class="close-btn" on:click={closeModal}>×</button>
      </div>

      <div class="details">
        {#each Object.entries(selectedEntry) as [key, value]}
          <p><strong>{key}:</strong> {value ?? "—"}</p>
        {/each}
      </div>

      <div class="project-status">
        <div class="status-title">PROJECT STATUS</div>
        <div class="status-legend">
          <div><span class="circle green"></span> Completed</div>
          <div><span class="circle red"></span> Not Completed</div>
        </div>
        <div class="stages-grid">
          <div class="stage-box">Stage 1<br>Application Receipt<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 2<br>Preliminary Assessment<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 3<br>Assessment by HoD<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 4<br>Design Idea / Concept Defence<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 5<br>Proof of Concept (Solution)<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 6<br>Project Progress Reviews<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 7<br>Prototype Development<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 8<br>Field Trials & Performance Analysis<small>&lt;date&gt;</small></div>
          <div class="stage-box">Stage 9<br>Final Prototype Demonstration<small>&lt;date&gt;</small></div>
          <div class="stage-box">Completion Status<br>Certificate Issue<small>&lt;date&gt;</small></div>
        </div>
      </div>
    </div>
  </div>
{/if}
