<script>
  import { goto } from '$app/navigation';

  const members = [
    { title: "Principal / CEO", link: "/adminpage" },
    { title: "CIC Head / Manager",  link: "/adminpage2" }
  ];

  function handleClick(link) {
    goto(link);
  }
</script>

<style>
  .page {
    background: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
  }

  .box-container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeIn 1s ease-in-out;
  }

  .card {
    background: #f9fafb;
    border-radius: 16px;
    padding: 2rem 3rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    min-width: 260px;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    background: #ffffff;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 500;
    color: #334155;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .card {
      padding: 1.5rem 2rem;
      min-width: 200px;
    }
  }
</style>

<div class="page">
  <div class="box-container">
    {#each members as member}
      <div class="card" on:click={() => handleClick(member.link)}>
        <div class="title">{member.title}</div>
        <div class="name">{member.name}</div>
      </div>
    {/each}
  </div>
</div>
