<script>
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/studentsdashboard`
      }
    });

    if (error) {
      console.error('Error signing in:', error.message);
    }
  }

  // Optional: handle redirect if session already exists
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      goto('/studentsdashboard');
    }
  });
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div class="p-8 bg-white rounded-lg shadow-md text-center">
    <h1 class="text-2xl font-bold mb-6">Welcome</h1>
    <button
      on:click={signInWithGoogle}
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg">
      Sign in with Google
    </button>
  </div>
</main>
