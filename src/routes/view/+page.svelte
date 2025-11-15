<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import Chart from "chart.js/auto";

  let data = [];
  let loading = true;

  // Dashboard KPIs
  let totalIdeas = 0;
  let totalUsers = 0;
  let stageCounts = {};

  // For charts reference
  let chart1, chart2, chart3, chart4, chart5;

  const stages = [
    "Stage 1 - Application Receipt",
    "Stage 2 - Preliminary Assessment",
    "Stage 3 - Assessment by HoD",
    "Stage 4 - Design Idea Defence",
    "Stage 5 - Proof of Concept",
    "Stage 6 - Progress Reviews",
    "Stage 7 - Prototype Development",
    "Stage 8 - Field Trials",
    "Stage 9 - Final Prototype"
  ];

  onMount(async () => {
    const { data: ideas, error } = await supabase
      .from("design_ideas")
      .select("*");

    if (error) console.log(error);
    else {
      data = ideas;
      totalIdeas = ideas.length;

      // count users
      const uniqueUsers = new Set(ideas.map(i => i.created_by));
      totalUsers = uniqueUsers.size;

      // stage counts
      stageCounts = {};
      stages.forEach(s => stageCounts[s] = 0);
      ideas.forEach(i => {
        if (stageCounts[i.current_stage]) stageCounts[i.current_stage]++;
      });

      initCharts();
    }

    loading = false;
  });

  function initCharts() {
    createChart("c1", "bar", stageCounts);
    createChart("c2", "pie", stageCounts);
    createChart("c3", "line", stageCounts);
    createChart("c4", "doughnut", stageCounts);
    createChart("c5", "bar", stageCounts);
  }

  function createChart(canvasId, type, dataset) {
    const ctx = document.getElementById(canvasId);

    new Chart(ctx, {
      type,
      data: {
        labels: Object.keys(dataset),
        datasets: [
          {
            label: "Count",
            data: Object.values(dataset),
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
</script>

<style>
  .page {
    padding: 20px;
    background: #f7f7f7;
    min-height: 100vh;
    font-family: "Segoe UI";
  }

  .heading {
    font-size: 1.8rem;
    font-weight: 700;
    color: #004080;
    margin-bottom: 20px;
  }

  /* KPI BOXES */
  .kpi-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .kpi-box {
    flex: 1;
    min-width: 200px;
    background: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  }
  .kpi-title {
    color: #555;
    font-size: 0.9rem;
  }
  .kpi-value {
    font-size: 2rem;
    font-weight: bold;
    color: #003366;
  }

  /* 5 CHART GRID */
  .chart-grid {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 22px;
  }
  .chart-box {
    background: white;
    padding: 20px;
    height: 350px;
    border-radius: 16px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  }

  /* STAGE TIMELINE */
  .timeline {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 40px;
    gap: 20px;
  }
  .stage-card {
    background: white;
    padding: 18px;
    border-radius: 14px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
    position: relative;
    border-left: 4px solid #004080;
  }
  .stage-card::after {
    content: "➜";
    position: absolute;
    right: -18px;
    top: 40%;
    font-size: 1.5rem;
    color: #004080;
  }
  .stage-card:last-child::after {
    display: none;
  }

  .stage-title {
    font-weight: 600;
    color: #003366;
  }
</style>

<div class="page">
  <div class="heading">📊 Design Ideas Dashboard</div>

  {#if loading}
    <p>Loading dashboard...</p>
  {:else}

    <!-- KPI ROW -->
    <div class="kpi-row">
      <div class="kpi-box">
        <div class="kpi-title">Total Ideas</div>
        <div class="kpi-value">{totalIdeas}</div>
      </div>

      <div class="kpi-box">
        <div class="kpi-title">Total Users Submitted</div>
        <div class="kpi-value">{totalUsers}</div>
      </div>

      <div class="kpi-box">
        <div class="kpi-title">Active Stages</div>
        <div class="kpi-value">{Object.values(stageCounts).filter(x=>x>0).length}</div>
      </div>

      <div class="kpi-box">
        <div class="kpi-title">Completed (Stage 9)</div>
        <div class="kpi-value">{stageCounts["Stage 9 - Final Prototype"]}</div>
      </div>
    </div>

    <!-- STAGE TIMELINE (4 PER ROW) -->
    <div class="heading" style="margin-top:30px;">🔄 Stage Timeline</div>
    <div class="timeline">
      {#each stages as stg}
        <div class="stage-card">
          <div class="stage-title">{stg}</div>
        </div>
      {/each}
    </div>

    <!-- 5 CHARTS -->
    <div class="heading" style="margin-top:40px;">📈 Charts Overview</div>
    <div class="chart-grid">
      <div class="chart-box"><canvas id="c1"></canvas></div>
      <div class="chart-box"><canvas id="c2"></canvas></div>
      <div class="chart-box"><canvas id="c3"></canvas></div>
      <div class="chart-box"><canvas id="c4"></canvas></div>
      <div class="chart-box"><canvas id="c5"></canvas></div>
    </div>

  {/if}
</div>
