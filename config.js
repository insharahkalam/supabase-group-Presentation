const supaUrl = 'https://jzxxnlisarhqbdkqobmy.supabase.co';
const supaKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHhubGlzYXJocWJka3FvYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDEyMzQsImV4cCI6MjA3NjgxNzIzNH0.blYwoj2ObZ0Om5UoARD07HNFk9xXvfKmXIfihRIzf8Q';
const { createClient } = supabase;
const client = createClient(supaUrl, supaKey)

console.log(createClient);
console.log(client);

export default client