<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";

  let entries = [];
  let filteredEntries = [];
  let searchQuery = "";
  let suggestions = [];
  let loading = true;

  // Fetch required fields from Supabase
  onMount(async () => {
    const { data, error } = await supabase
      .from("design_ideas")
      .select("id, idea_title, category, idea_description")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      entries = data || [];
      filteredEntries = entries;
    }
    loading = false;
  });

  // Filter results and suggestions as user types
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

  tr:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    table {
      font-size: 0.8rem;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .search-box {
      width: 100%;
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
            <tr>
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
</div>
