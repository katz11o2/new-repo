<script>
    const startups = [
       
       
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Kokoshell-1-1086x1536.png',
            title: 'KoKo Shell',
            document: 'https://engg.cambridge.edu.in/wp-content/uploads/2025/01/Group-2.pdf'
        },
       
       
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/elementor/thumbs/121669489-finger-snapping-icon-transformed-1-q2mmhn9ejzpd3q2562e9fm4wztnyy5dqwbnglkz37g.webp',
            title: 'Gestify',
            document: 'https://example.com/doc6'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Happy-Cures-1-1086x1536.png',
            title: 'Happy Cures',
            document: 'https://example.com/doc7'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/LOGO-FINblack.png',
            title: 'Projectoo',
            document: 'https://example.com/doc8'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/EksauEk-150x150.png',
            title: 'Ek Sau Ek',
            document: 'https://example.com/doc9'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Assista-1-1086x1536.png',
            title: 'Assista',
            document: 'https://example.com/doc10'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Anime-Vyuh%E2%80%8B-1-1086x1536.png',
            title: 'Anime Vyuh',
            document: 'https://example.com/doc11'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Right-Path%E2%80%8B-1-1086x1536.png',
            title: 'Right Path',
            document: 'https://example.com/doc12'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Qr-Travel.png',
            title: 'QR Travel',
            document: 'https://example.com/doc13'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/S-card.png',
            title: 'S-Card',
            document: 'https://example.com/doc14'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/Vitality-Monitor%E2%80%8B-1-1086x1536.png',
            title: 'Vitality Monitors',
            document: 'https://example.com/doc15'
        },
        {
            image: 'https://engg.cambridge.edu.in/wp-content/uploads/2023/01/V-Praxis-1-1086x1536.png',
            title: 'V-Praxis',
            document: 'https://example.com/doc16'
        }
    ];

    let selectedStartup = null;

    const openModal = (startup) => {
        selectedStartup = startup;
    };

    const closeModal = () => {
        selectedStartup = null;
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

    body {
        margin: 0;
        background: #fff;
        font-family: 'Poppins', sans-serif;
    }

    h1 {
        margin-top: 70px;
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        padding: 2rem;
        margin-top: 20px;
    }

    .card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        text-align: center;
        cursor: pointer;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        padding: 1rem;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card:hover {
        transform: translateY(-8px) scale(1.03);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }

    .card img {
        width: 100%;
        height: 150px;
        object-fit: contain;
        margin-bottom: 1rem;
        transition: transform 0.4s ease;
    }

    .card:hover img {
        transform: scale(1.05);
    }

    .title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #333;
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal.open {
        opacity: 1;
    }

    .modal-content {
        background: white;
        width: 90%;
        height: 90%;
        padding: 20px;
        overflow-y: auto;
        border-radius: 10px;
        position: relative;
    }

    .modal-content iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .back-btn {
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: #edd30b;
        color: rgb(84, 5, 5);
        padding: 10px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        width:20%;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }

    .back-btn:hover {
        background-color: #555;
    }
</style>

<h1>Student Startups</h1>

<div class="grid">
    {#each startups as startup}
        <div class="card" on:click={() => openModal(startup)}>
            <img src={startup.image} alt={startup.title} />
            <div class="title">{startup.title}</div>
        </div>
    {/each}
</div>

{#if selectedStartup}
    <div class="modal open">
        <div class="modal-content">
            <button class="back-btn" on:click={closeModal}>Back</button>
            <h2>{selectedStartup.title}</h2>
            <iframe src={selectedStartup.document}></iframe>
        </div>
    </div>
{/if}
