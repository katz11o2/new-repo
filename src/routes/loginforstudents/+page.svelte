<script>
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // ✅ Use production domain to avoid redirecting to localhost
        redirectTo: 'https://cambrian-sparkzone.com/studentsdashboard'
      }
    });

    if (error) {
      console.error('Error signing in:', error.message);
    }
  }

  // ✅ If user is already signed in, redirect to dashboard
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      goto('/studentsdashboard');
    }
  });
</script>

<!-- 👇 Simple Login UI -->
<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
  <div class="bg-white p-8 rounded shadow-md text-center">
    <h1 class="text-2xl font-bold mb-4">Welcome to Cambrian SparkZone</h1>
    <button 
      on:click={signInWithGoogle} 
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  </div>
</main>
