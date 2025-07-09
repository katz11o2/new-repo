<script>
  // You can later add logic here if needed (e.g., for animations)
</script>

<style>
  .team-box {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 220px;
    height: 100px;
    padding: 12px;
  }

  .team-box:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  }

  .team-text {
    color: #17194a;
    font-size: 0.75rem;
  }

  .team-image {
    width: 60px;
    height: 60px;
    border-radius: 0.75rem;
    object-fit: cover;
    margin-right: 0.75rem;
  }
</style>

<div class="w-full bg-white flex justify-center py-4 pt-5">
  <div class="relative w-full flex justify-center">
    <div class="bg-white py-10 px-4">
      <div class="relative left-93">
        <h1 class="relative text-5xl font-bold text-blue-800 text-left mb-20">Meet our Distinguished Team</h1>

        <div class="flex items-center gap-3 mt-1 mb-10">
          <span class="w-2 h-2 bg-blue-900 rounded-full"></span>
          <span class="w-2 h-2 bg-blue-900 rounded-full"></span>
          <div class="w-[360px] h-0.5 bg-blue-900 ml-2"></div>
        </div>
      </div>

      <!-- Row 1: 3 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto">
        <slot name="row1"></slot>
      </div>

      <!-- Row 2: 2 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-4xl mx-auto mt-8">
        <slot name="row2"></slot>
      </div>

      <!-- Row 3: 4 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto mt-8">
        <slot name="row3"></slot>
      </div>

      <!-- Row 4: 4 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto mt-8">
        <slot name="row4"></slot>
      </div>

      <!-- Row 5: 3 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto mt-8">
        <slot name="row5"></slot>
      </div>

      <!-- Row 6: 2 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-4xl mx-auto mt-8">
        <slot name="row6"></slot>
      </div>

      <!-- Row 7: 2 boxes -->
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-4xl mx-auto mt-8">
        <slot name="row7"></slot>
      </div>
    </div>
  </div>
</div>
