import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    // Test 1: List buckets
    console.log('\n1. Testing storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
    } else {
      console.log('Buckets:', buckets);
    }

    // Test 2: List files in templates bucket
    console.log('\n2. Testing templates bucket...');
    const { data: files, error: filesError } = await supabase.storage
      .from('templates')
      .list();

    if (filesError) {
      console.error('Error listing files:', filesError);
    } else {
      console.log('Files in templates bucket:', files);
    }

    // Test 3: Test database connection
    console.log('\n3. Testing database connection...');
    const { data: dbTest, error: dbError } = await supabase
      .from('template_metadata')
      .select('count')
      .limit(1);

    if (dbError) {
      console.error('Error testing database:', dbError);
    } else {
      console.log('Database connection OK');
    }

    console.log('\n✅ Supabase test completed!');
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error);
  }
}

testSupabase();
