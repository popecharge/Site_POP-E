import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // GET — uniquement nom + count, les lieux restent confidentiels
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('villes')
      .select('id, nom, count, last_date')
      .order('count', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  // POST — enregistre ville + lieu
  if (req.method === 'POST') {
    const { city, lieu } = req.body;
    if (!city) return res.status(400).json({ error: 'Ville manquante' });

    const key = city.toLowerCase().replace(/\s+/g, '-');

    const { data: existing } = await supabase
      .from('villes')
      .select('*')
      .eq('id', key)
      .single();

    if (existing) {
      const lieux = existing.lieux ? existing.lieux.split(',').filter(Boolean) : [];
      if (lieu && lieu.trim() && !lieux.includes(lieu.trim())) {
        lieux.push(lieu.trim());
      }
      await supabase
        .from('villes')
        .update({
          count: existing.count + 1,
          lieux: lieux.join(','),
          last_date: new Date().toISOString()
        })
        .eq('id', key);
    } else {
      await supabase
        .from('villes')
        .insert({
          id: key,
          nom: city,
          count: 1,
          lieux: lieu && lieu.trim() ? [lieu.trim()] : [],
          last_date: new Date().toISOString()
        });
    }

    return res.json({ success: true });
  }
}