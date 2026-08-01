import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jggucbcnvxdpkbhcfoqk.supabase.co';
const supabaseKey = 'sb_publishable_Tl0k-5cS3J_lz_MfStfsnQ_PUtisFWR';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDb() {
  const { data: diagnostics } = await supabase.from('user_diagnostics').select('*');
  console.log('ALL diagnostics in DB:', diagnostics);
}

checkDb();
