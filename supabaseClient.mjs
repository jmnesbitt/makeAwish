// supabaseClient.mjs
import { createClient } from '/@supabase/supabase-js';

const supabaseUrl = 'https://aompyldrxifdsiyswjtx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbXB5bGRyeGlmZHNpeXN3anR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTAwMTIsImV4cCI6MjAyODkyNjAxMn0.-ejgvBgVWsCvGxD76CSYPS03fwPZIpiJvw7wrJMTiAY';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };