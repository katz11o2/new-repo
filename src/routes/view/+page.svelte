<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import Chart from "chart.js/auto";

  // ---------------------
  // YOUR ORIGINAL VARIABLES (unchanged)
  // ---------------------
  let entries = [];
  let filteredEntries = [];
  let loading = true;
  let searchQuery = "";
  let suggestions = [];
  let showStatus = {};
  let selectedEntryDetails = {};
  let columns = []; // auto headers

  const industryKeywords = [
    "New Product Development",
    "New Process Development",
    "New Features in Existing Product",
    "Problems in Existing Product",
    "Problems in Existing Processes"
  ];

  // ---------------------
  // NEW: Dashboard-specific state
  // ---------------------
  let supabaseError = null;

  // KPIs
  let totalIdeas = 0;
  let totalUsers = 0;
  let completedCount = 0;
  let inProgressCount = 0;
  let pendingCount = 0;
  let stageCounts = {};

  // Chart handles so we can destroy on re-init
  let charts = [];

  const stagesList = [
    "Stage 1 - Application Receipt",
    "Stage 2 - Preliminary Assessment",
    "Stage 3 - Assessment by HoD",
    "Stage 4 - Design Idea Defence",
    "Stage 5 - Proof of Concept",
    "Stage 6 - Project Progress Reviews",
    "Stage 7 - Prototype Development",
    "Stage 8 - Field Trials",
    "Stage 9 - Final Prototype"
  ];

  // ---------------------
  // FETCH & INIT
  // (keeps your onMount fetch logic but extends it to compute KPIs & charts)
  // ---------------------
  onMount(async () => {
    supabaseError = null;
    loading = true;

    const { data, error } = await supabase
      .from("design_ideas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      supabaseError = error.message || JSON.stringify(error);
      // still set loading false so UI shows error
      entries = [];
      filteredEntries = [];
      columns = [];
      loading = false;
      return;
    }

    entries = data || [];
    filteredEntries = entries;
    if (entries.length > 0) columns = Object.keys(entries[0]);

    // --- KPIs computed from entries (Option 1: auto-calc) ---
    totalIdeas = entries.length;

    // totalUsers (unique created_by) - safe fallback if field missing
    try {
      const users = new Set(entries.map((i) => i.created_by ?? i.created_by_id ?? i.user_id).filter(Boolean));
      totalUsers = users.size;
    } catch (e) {
      totalUsers = 0;
    }

    // simple categorization (best-effort): look for common status fields
    completedCount = entries.filter(e => {
      const s = String(e.current_stage ?? e.status ?? "").toLowerCase();
      return s.includes("final") || s.includes("completed") || s.includes("done") || s.includes("stage 9");
    }).length;

    inProgressCount = entries.filter(e => {
      const s = String(e.current_stage ?? e.status ?? "").toLowerCase();
      return s.includes("progress") || s.includes("in progress") || s.includes("ongoing") || s.includes("stage");
    }).length - completedCount;
    if (inProgressCount < 0) inProgressCount = 0;

    pendingCount = totalIdeas - completedCount - inProgressCount;
    if (pendingCount < 0) pendingCount = 0;

    // stage counts map (use current_stage if exists; fallback to stage field or empty)
    stageCounts = {};
    stagesList.forEach(s => stageCounts[s] = 0);
    entries.forEach(i => {
      const key = i.current_stage || i.stage || i.status || "";
      // try to match to one of our stagesList keys by substring, else bucket under "Other"
      let matched = false;
      if (key) {
        const lower = String(key).toLowerCase();
        for (const s of stagesList) {
          if (lower.includes(String(s).toLowerCase().split(" - ")[0])) {
            stageCounts[s] = (stageCounts[s] || 0) + 1;
            matched = true;
            break;
          }
        }
      }
      if (!matched) {
        // bucket: if entry has numeric stage like "Stage 3" match it
        const m = String(key).match(/stage\s*([0-9])/i);
        if (m && stagesList[m[1]-1]) {
          stageCounts[stagesList[m[1]-1]]++;
        } else {
          stageCounts["Stage 1 - Application Receipt"] = (stageCounts["Stage 1 - Application Receipt"] || 0) + 0; // keep shape
        }
      }
    });

    // initialize charts after a small tick so canvas exists
    setTimeout(() => initCharts(), 50);

    loading = false;
  });

  // ---------------------
  // YOUR ORIGINAL FUNCTIONS (unchanged)
  // ---------------------
  // search functionality
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

  async function toggleStatus(entryId) {
    showStatus[entryId] = !showStatus[entryId];
    showStatus = { ...showStatus };

    if (showStatus[entryId]) {
      const { data, error } = await supabase
        .from("design_ideas")
        .select("*")
        .eq("id", entryId)
        .single();

      if (!error && data) selectedEntryDetails[entryId] = data;
    }
  }

  // ---------------------
  // CHART HELPERS
  // ---------------------
  function destroyCharts() {
    charts.forEach((c) => {
      try { c.destroy(); } catch (e) { /* ignore */ }
    });
    charts = [];
  }

  function initCharts() {
    destroyCharts();

    // prepare chart data
    const labels = Object.keys(stageCounts);
    const values = Object.values(stageCounts);

    // chart 1 - bar
    const c1 = document.getElementById("chart1");
    if (c1) {
      charts.push(new Chart(c1, {
        type: "bar",
        data: {
          labels,
          datasets: [{ label: "Ideas by Stage", data: values, borderWidth: 1 }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      }));
    }

    // chart 2 - pie
    const c2 = document.getElementById("chart2");
    if (c2) {
      charts.push(new Chart(c2, {
        type: "pie",
        data: { labels, datasets: [{ label: "Distribution", data: values }] },
        options: { responsive: true, maintainAspectRatio: false }
      }));
    }

    // chart 3 - line (cumulative over stages)
    const cum = values.reduce((acc, v, i) => { acc.push((acc[i-1]||0) + v); return acc; }, []);
    const c3 = document.getElementById("chart3");
    if (c3) {
      charts.push(new Chart(c3, {
        type: "line",
        data: { labels, datasets: [{ label: "Cumulative count", data: cum, fill: false, tension: 0.3 }] },
        options: { responsive: true, maintainAspectRatio: false }
      }));
    }

    // chart 4 - doughnut
    const c4 = document.getElementById("chart4");
    if (c4) {
      charts.push(new Chart(c4, {
        type: "doughnut",
        data: { labels, datasets: [{ label: "Stage split", data: values }] },
        options: { responsive: true, maintainAspectRatio: false }
      }));
    }

    // chart 5 - horizontal bar of top 5 stages (fallback if many)
    const topIndexes = values
      .map((v, i) => ({ v, i }))
      .sort((a,b)=>b.v-a.v)
      .slice(0,5)
      .map(x => x.i);
    const topLabels = topIndexes.map(i => labels[i]);
    const topValues = topIndexes.map(i => values[i]);

    const c5 = document.getElementById("chart5");
    if (c5) {
      charts.push(new Chart(c5, {
        type: "bar",
        data: { labels: topLabels, datasets: [{ label: "Top stages", data: topValues, borderWidth: 1 }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
      }));
    }
  }
</script>

<style>
  /* ========== your original styles (kept) ========== */
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
    min-width: 1000px; /* 👈 ensures table expands horizontally */
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  th,
  td {
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
    transition: background 0.2s ease;
  }

  tr:hover {
    background-color: #f5f9ff;
  }

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

  /* status container */
  .status-container {
    background: #fafafa;
    border-left: 4px solid #004080;
    margin: 0.8rem 0 1.5rem 0;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .status-title {
    font-size: 1rem;
    font-weight: 600;
    color: #004080;
    margin-bottom: 0.8rem;
  }

  .status-legend {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    margin-bottom: 0.6rem;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  .circle.green {
    background: #00a65a;
  }

  .circle.red {
    background: #d9534f;
  }

  .stages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
  }

  .stage-box {
    background: #d9534f;
    color: white;
    border-radius: 6px;
    padding: 6px;
    font-size: 0.8rem;
  }

  .stage-box:first-child {
    background: #00a65a;
    box-shadow: 0 0 6px rgba(0, 150, 0, 0.3);
  }

  .table-wrapper {
    width: 100%;
    overflow-x: auto;  /* Enables horizontal scroll */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
  }

  /* ========== NEW: dashboard & chart styles ========== */
  .kpi-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .kpi-box {
    background: white;
    padding: 14px;
    border-radius: 10px;
    min-width: 160px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
    flex: 1 1 160px;
  }
  .kpi-title { color: #666; font-size: 0.85rem; }
  .kpi-value { color: #003366; font-size: 1.6rem; font-weight: 700; margin-top: 6px; }

  .charts-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin-bottom: 18px;
  }
  .chart-card {
    background: white;
    border-radius: 10px;
    padding: 12px;
    height: 320px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
  }
  .chart-card canvas { width: 100%; height: 100%; }

  /* Stage timeline: 4 in a row with arrow marks */
  .timeline {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 18px;
    align-items: center;
  }
  .timeline-card {
    background: white;
    padding: 14px;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
    border-left: 4px solid #004080;
  }
  .timeline-card::after {
    content: "➜";
    position: absolute;
    right: -18px;
    top: 48%;
    font-size: 22px;
    color: #004080;
  }
  .timeline-card:nth-child(4n)::after { display: none; /* last in row hide arrow */ }
  .timeline-title { font-weight: 600; color: #003366; margin-bottom: 6px; }
  .timeline-count { color: #555; font-size: 0.95rem; }

  /* small error box */
  .error-box {
    background: #fff4f4;
    color: #900;
    border: 1px solid #f2c2c2;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 12px;
  }
</style>

<div class="page">
  <!-- ========== NEW: Dashboard top (KPIs + charts + timeline) ========== -->
  <div class="header" style="align-items:flex-start;">
    <div class="title">Design Ideas — Dashboard</div>
    <div style="font-size:0.9rem; color:#666; margin-top:4px;">Data source: Supabase › design_ideas</div>
  </div>

  {#if supabaseError}
    <div class="error-box">Failed to load data from Supabase: {supabaseError}</div>
  {/if}

  {#if loading}
    <p>Loading dashboard...</p>
  {:else}
    <!-- KPI row -->
    <div class="kpi-row">
      <div class="kpi-box">
        <div class="kpi-title">Total Ideas</div>
        <div class="kpi-value">{totalIdeas}</div>
      </div>

      <div class="kpi-box">
        <div class="kpi-title">Total Users (unique)</div>
        <div class="kpi-value">{totalUsers}</div>
      </div>

      <div class="kpi-box">
        <div class="kpi-title">Completed (detected)</div>
        <div class="kpi-value">{completedCount}</div>
      </div>

      <div class="kpi-box">
        <div class="kpi-title">In Progress (approx)</div>
        <div class="kpi-value">{inProgressCount}</div>
      </div>
    </div>

    <!-- Stage timeline (4 in a row) -->
    <div style="margin-bottom:10px; font-weight:600; color:#004080;">Stage Timeline</div>
    <div class="timeline">
      {#each stagesList as st, idx}
        <div class="timeline-card">
          <div class="timeline-title">{st}</div>
          <div class="timeline-count">{stageCounts[st] ?? 0} ideas</div>
        </div>
      {/each}
    </div>

    <!-- Charts -->
    <div style="margin-top:6px; font-weight:600; color:#004080;">Charts</div>
    <div class="charts-grid">
      <div class="chart-card"><canvas id="chart1"></canvas></div>
      <div class="chart-card"><canvas id="chart2"></canvas></div>
      <div class="chart-card"><canvas id="chart3"></canvas></div>
      <div class="chart-card"><canvas id="chart4"></canvas></div>
      <div class="chart-card" style="grid-column: 1 / -1;"><canvas id="chart5"></canvas></div>
    </div>
  {/if}

  <!-- ========== YOUR ORIGINAL TABLE UI (kept exactly as you gave it) ========== -->
  <div class="header" style="margin-top:8px;">
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
            <div on:click={() => selectSuggestion(s)}>#{s.id} — {s.idea_title}</div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if loading}
    <p>Loading entries...</p>
  {:else}
    <!-- 👇 Added a scroll wrapper -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            {#each columns as col}
              <th>{col}</th>
            {/each}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {#each filteredEntries as entry}
            <tr>
              {#each columns as col}
                <td>{entry[col]}</td>
              {/each}
              <td>
                <button class="toggle-status" on:click={() => toggleStatus(entry.id)}>
                  {showStatus[entry.id] ? "Hide Status" : "View Status"}
                </button>
              </td>
            </tr>

            {#if showStatus[entry.id]}
              <tr>
                <td colspan={columns.length + 1}>
                  <div class="status-container">
                    <div class="status-title">PROJECT STATUS</div>
                    <div class="status-legend">
                      <div><span class="circle green"></span> Completed</div>
                      <div><span class="circle red"></span> Not Completed</div>
                    </div>
                    <div class="stages-grid">
                      <div class="stage-box">Stage 1<br />Application Receipt</div>
                      <div class="stage-box">Stage 2<br />Preliminary Assessment</div>
                      <div class="stage-box">Stage 3<br />Assessment by HoD</div>
                      <div class="stage-box">Stage 4<br />Design Idea Defence</div>
                      <div class="stage-box">Stage 5<br />Proof of Concept</div>
                      <div class="stage-box">Stage 6<br />Project Progress Reviews</div>
                      <div class="stage-box">Stage 7<br />Prototype Development</div>
                      <div class="stage-box">Stage 8<br />Field Trials</div>
                      <div class="stage-box">Stage 9<br />Final Prototype</div>
                      <div class="stage-box">Completion Status</div>
                    </div>
                  </div>
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
