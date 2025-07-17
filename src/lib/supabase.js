// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zuylqvflubicsuorflzg.supabase.co'; // replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1eWxxdmZsdWJpY3N1b3JmbHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NDE4MTUsImV4cCI6MjA2ODMxNzgxNX0.gWRflvVOt1lDZdrWYiHH5diBv0atmkI3vWJ5h3z3YQQ'; // replace this
export const supabase = createClient(supabaseUrl, supabaseKey);
