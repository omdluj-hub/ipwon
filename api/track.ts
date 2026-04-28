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
      
      // Use lpush and ltrim from @vercel/kv
      await kv.lpush('visits', JSON.stringify(visit));
      await kv.ltrim('visits', 0, 999);
      
      return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
      const visits = await kv.lrange('visits', 0, -1);
      // @vercel/kv might return objects directly if they were stored as JSON, 
      // but let's be safe and handle both cases.
      const parsedVisits = visits.map(v => typeof v === 'string' ? JSON.parse(v) : v);
      return res.status(200).json(parsedVisits);
    }

    if (req.method === 'DELETE') {
      await kv.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('KV Operation Error:', error);
    return res.status(500).json({ 
      error: 'KV Operation Failed', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
