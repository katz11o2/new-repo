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

  // Fetch limited fields initially
  onMount(async () => {
    const { data, error } = await supabase
      .from("design_ideas")
      .select("id, idea_title, category, idea_description")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching data:", error);
    else {
      entries = data || [];
      filteredEntries = entries;
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

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #004080;
  }

  .search-box {
    position: relative;
    width: 260px;
  }

  input[type="search"] {
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.2s ease;
  }

  input[type="search"]:focus {
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

  .details p {
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
  }

  .details strong {
    color: #004080;
  }

  /* Project Status Section */
  .project-status {
    margin-top: 2rem;
    text-align: center;
  }

  .status-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #004080;
    margin-bottom: 1rem;
  }

  /* Legend for Completed/Not Completed */
  .status-legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 8px;
    font-size: 0.85rem;
  }

  .status-legend div {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  .circle.green {
    background-color: #00a65a;
  }

  .circle.red {
    background-color: #d9534f;
  }

  .stages-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    justify-items: center;
  }

  .stage-box {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px;
    width: 100%;
    background-color: #d9534f; /* red for all by default */
    color: white;
    font-size: 0.85rem;
  }

  .stage-box:first-child {
    background-color: #00a65a; /* green for first stage */
    box-shadow: 0 0 8px rgba(0, 150, 0, 0.3);
  }

  .stage-box small {
    display: block;
    margin-top: 4px;
    font-size: 0.8rem;
    color: #fff;
  }

  @media (max-width: 700px) {
    .stages-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<div class="page">
  <div class="header">
    <div class="title">Design Ideas</div>

    <div class="search-box">
      <input
        type="search"
        placeholder="Search by ID or Title..."
        on:input={handleSearch}
        bind:value={searchQuery}
      />
      {#if suggestions.length > 0}
        <div class="suggestions">
          {#each suggestions as s}
            <div on:click={() => selectSuggestion(s)}>
              #{s.id} — {s.idea_title}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if loading}
    <p>Loading entries...</p>
  {:else if filteredEntries.length === 0}
    <p>No results found.</p>
  {:else}
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredEntries as entry}
            <tr on:click={() => openDetails(entry.id)}>
              <td>{entry.id}</td>
              <td>{entry.idea_title || "Untitled"}</td>
              <td>{entry.category}</td>
              <td>{entry.idea_description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

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

        <!-- 🧩 Project Status Flowchart -->
        <div class="project-status">
          <div class="status-title">PROJECT STATUS</div>

          <!-- Completed / Not Completed Legend -->
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
</div>
