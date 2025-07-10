<script>
  import { onMount } from 'svelte';

  const MASTER_KEY = "$2a$10$7s2J1bfLkUw4k5xI41hADupk/1x12kJIIECHjYqWCruKDUnE0/wKu";
  const STUDENT_BIN_KEY = "jsonbin_design_ideas";
  const INDUSTRY_BIN_KEY = "jsonbin_industry_ideas";

  let studentEntries = [];
  let industryEntries = [];
  let loading = true;

  async function fetchEntries(binKeyStorage, targetArray) {
    const binId = localStorage.getItem(binKeyStorage);
    if (!binId) return [];

    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { "X-Master-Key": MASTER_KEY }
    });

    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    return json.record || [];
  }

  onMount(async () => {
    try {
      [studentEntries, industryEntries] = await Promise.all([
        fetchEntries(STUDENT_BIN_KEY),
        fetchEntries(INDUSTRY_BIN_KEY)
      ]);
    } catch (err) {
      console.error(err);
      alert("❌ Could not load submissions.");
    } finally {
      loading = false;
    }
  });
</script>

<div class="min-h-screen bg-gray-100 p-6">
  <div class="max-w-5xl mt-10 mx-auto">
    <h1 class="text-3xl font-bold text-blue-700 text-center mb-6">📋 Submitted Design Ideas</h1>

    {#if loading}
      <p class="text-center text-gray-500">Loading submissions...</p>
    {:else}
      {#if studentEntries.length > 0}
        <h2 class="text-2xl font-semibold text-blue-600 mt-10 mb-4">🎓 Student Submissions</h2>
        <div class="grid gap-6">
          {#each studentEntries as entry, index}
            <div class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 class="text-xl font-semibold text-blue-600 mb-2">#{index + 1}: {entry.title}</h2>

              <div class="grid md:grid-cols-2 gap-4 text-gray-800 text-sm">
                <p><strong>Category:</strong> {entry.category}</p>
                {#if entry.otherCategory}
                  <p><strong>Other Category:</strong> {entry.otherCategory}</p>
                {/if}
                <p><strong>Uniqueness:</strong> {entry.uniqueness}</p>
                {#if entry.patentability}
                  <p><strong>Patentability:</strong> {entry.patentability}</p>
                {/if}
                <p><strong>Existing Technologies:</strong> {entry.existingTechnologies}</p>
                <p><strong>Gap Analysis:</strong> {entry.gapAnalysis}</p>
                <p><strong>Marketing Data:</strong> {entry.Marketingdata}</p>
                <p><strong>Description:</strong> {entry.description}</p>
                <p><strong>Research Data:</strong> {entry.researchData || '—'}</p>
                <p><strong>Experimental Data:</strong> {entry.experimentalData || '—'}</p>
                <p><strong>Submitted At:</strong> {entry.submittedAt ? new Date(entry.submittedAt).toLocaleString() : '—'}</p>
              </div>

              {#if entry.visualizedProduct}
                <div class="mt-4">
                  <p class="font-medium text-sm mb-1 text-gray-700">Visualized Product:</p>
                  <img src={entry.visualizedProduct} alt="Visual" class="max-w-xs rounded-md border" />
                </div>
              {/if}

              <!-- Dummy Send Section -->
              <div class="mt-4 flex flex-col md:flex-row md:items-center gap-2 text-sm">
                <select class="border border-gray-300 rounded-md px-2 py-1 bg-gray-100 text-gray-700 w-full md:w-auto">
                  <option disabled selected>Send to</option>
                  <option>CSE HOD</option>
                  <option>ECE HOD</option>
                  <option>MECH HOD</option>
                  <option>CIVIL HOD</option>
                </select>
                <input type="text" placeholder="Comments..." class="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm" />
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Send</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      {#if industryEntries.length > 0}
        <h2 class="text-2xl font-semibold text-blue-600 mt-12 mb-4">🏭 Industry Submissions</h2>
        <div class="grid gap-6">
          {#each industryEntries as entry, index}
            <div class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 class="text-xl font-semibold text-blue-600 mb-2">#{index + 1}: {entry.title}</h2>

              <div class="grid md:grid-cols-2 gap-4 text-gray-800 text-sm">
                <p><strong>Category:</strong> {entry.category}</p>
                {#if entry.otherCategory}
                  <p><strong>Other Category:</strong> {entry.otherCategory}</p>
                {/if}
                <p><strong>Uniqueness:</strong> {entry.uniqueness}</p>
                {#if entry.patentability}
                  <p><strong>Patentability:</strong> {entry.patentability}</p>
                {/if}
                <p><strong>Existing Technologies:</strong> {entry.existingTechnologies}</p>
                <p><strong>Gap Analysis:</strong> {entry.gapAnalysis}</p>
                <p><strong>Marketing Data:</strong> {entry.Marketingdata}</p>
                <p><strong>Description:</strong> {entry.description}</p>
                <p><strong>Research Data:</strong> {entry.researchData || '—'}</p>
                <p><strong>Experimental Data:</strong> {entry.experimentalData || '—'}</p>
                <p><strong>Submitted At:</strong> {entry.submittedAt ? new Date(entry.submittedAt).toLocaleString() : '—'}</p>
              </div>

              {#if entry.visualizedProduct}
                <div class="mt-4">
                  <p class="font-medium text-sm mb-1 text-gray-700">Visualized Product:</p>
                  <img src={entry.visualizedProduct} alt="Visual" class="max-w-xs rounded-md border" />
                </div>
              {/if}

              <!-- Dummy Send Section -->
              <div class="mt-4 flex flex-col md:flex-row md:items-center gap-2 text-sm">
                <select class="border border-gray-300 rounded-md px-2 py-1 bg-gray-100 text-gray-700 w-full md:w-auto">
                  <option disabled selected>Send to</option>
                  <option>CSE HOD</option>
                  <option>ECE HOD</option>
                  <option>MECH HOD</option>
                  <option>CIVIL HOD</option>
                </select>
                <input type="text" placeholder="Comments..." class="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm" />
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Send</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      {#if studentEntries.length === 0 && industryEntries.length === 0}
        <p class="text-center text-gray-500">No entries found.</p>
      {/if}
    {/if}
  </div>
</div>
