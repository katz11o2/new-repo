<script>
  import { supabase } from '$lib/supabase';

  let message = 'Waiting for Supabase...';

  // Test function to check Supabase connection
  const testSupabase = async () => {
    try {
      const { data, error } = await supabase.from('test_table').select('*').limit(1);

      if (error) {
        message = 'Supabase error: ' + error.message;
      } else {
        message = 'Supabase connected! Data fetched successfully.';
        console.log(data);
      }
    } catch (err) {
      message = 'Unexpected error: ' + err.message;
    }
  };

  testSupabase();
</script>

<main class="p-8">
  <h1 class="text-2xl font-bold mb-4">Student Dashboard Test</h1>
  <p>{message}</p>
</main>
