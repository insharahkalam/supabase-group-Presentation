const projectUrl = "https://dnehwweprdbyseuiouie.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZWh3d2VwcmRieXNldWlvdWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTA5NTgsImV4cCI6MjA3NjcyNjk1OH0.i49X5PJFTzyL5LRyxaQykGUEmOtoeYOslMXQs4Oegug"
const { createClient } = supabase;
const client = createClient(projectUrl,projectKey)

console.log(createClient);
console.log(client);
