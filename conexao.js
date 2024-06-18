import { createClient } from "@supabase/supabase-js";
const link = "https://bseodmoirlshqooyrpzu.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZW9kbW9pcmxzaHFvb3lycHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NjE0NTIsImV4cCI6MjAzNDIzNzQ1Mn0.rwDka0js5_WMVj92QDyO3LnXrMVedCOmBSawp18AiGk"
export const supabase = createClient(link, chave);