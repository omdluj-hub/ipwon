import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      const { referrer, utmSource, timestamp, path, userAgent } = req.body;
      
      const headerUserAgent = req.headers['user-agent'] || userAgent || 'Unknown';
      
      const visit = { 
        referrer: referrer || 'Direct', 
        utmSource: utmSource || 'None', 
        timestamp: timestamp || new Date().toISOString(), 
        path: path || '/', 
        userAgent: headerUserAgent 
      };
      
      try {
        await kv.lpush('visits', JSON.stringify(visit));
        await kv.ltrim('visits', 0, 999);
      } catch (kvError) {
        console.error('KV Storage Error:', kvError);
        return res.status(500).json({ error: 'Failed to save to KV', details: kvError });
      }
      
      return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
      try {
        const visits = await kv.lrange('visits', 0, -1);
        const parsedVisits = visits.map(v => typeof v === 'string' ? JSON.parse(v) : v);
        return res.status(200).json(parsedVisits);
      } catch (kvError) {
        console.error('KV Fetch Error:', kvError);
        return res.status(500).json({ error: 'Failed to fetch from KV', details: kvError });
      }
    }

    if (req.method === 'DELETE') {
      await kv.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (globalError) {
    console.error('Global API Error:', globalError);
    return res.status(500).json({ error: 'Internal Server Error', details: globalError });
  }
}
