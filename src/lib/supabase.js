// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cllmmiuzdzoajmwxiypb.supabase.co'; // replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbG1taXV6ZHpvYWptd3hpeXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NjM5NDMsImV4cCI6MjA3NzEzOTk0M30.VuuVJWxpwvV2TJYKB3rbbgqVb3gmErBpSL3llr7EtLA'; // replace this
export const supabase = createClient(supabaseUrl, supabaseKey);
