// Minimal Supabase upload helper using anonymous key (for demo/testing only)
const fetch = require('node-fetch');
const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

async function uploadToSupabase(bucket, key, buffer, contentType){
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodeURIComponent(key)}`;
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: buffer
  });
  if (!resp.ok) throw new Error('Upload failed: ' + resp.statusText);
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeURIComponent(key)}`;
}

module.exports = { uploadToSupabase };
