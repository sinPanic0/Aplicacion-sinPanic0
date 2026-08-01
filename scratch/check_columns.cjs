const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');

// Read env variables
const envConfig = dotenv.parse(fs.readFileSync('c:\\Users\\sicsa\\OneDrive\\Documentos\\Sin Panic0\\.env'));
const supabaseUrl = envConfig.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  try {
    const { data, error } = await supabase.from('user_profiles').select('*').limit(1);
    if (error) throw error;
    console.log("Database connection successful!");
    if (data && data.length > 0) {
      console.log("Columns in user_profiles:", Object.keys(data[0]));
    } else {
      console.log("No rows in user_profiles to inspect columns.");
    }
  } catch (e) {
    console.error("Error querying database:", e);
  }
}

checkColumns();
