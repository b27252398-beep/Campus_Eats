import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rbqknoyimzbhcgjnvner.supabase.co';
const supabaseKey = 'sb_publishable_MfSTd8Mlc_Uzo2PKQoa5qw_H0geNWKq';

export const supabase = createClient(supabaseUrl, supabaseKey);
