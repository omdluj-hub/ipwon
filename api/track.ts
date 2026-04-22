import { createClient } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for all possible environment variable names
  const url = process.env.KV_REST_API_URL || 
              process.env.UPSTASH_REDIS_REST_URL || 
              process.env.REDIS_URL;
              
  const token = process.env.KV_REST_API_TOKEN || 
                process.env.UPSTASH_REDIS_REST_TOKEN || 
                process.env.REDIS_TOKEN || 
                ""; // Default to empty if not found

  const envCheck = {
    urlFound: !!url,
    tokenFound: !!token,
    detectedNames: {
      KV: !!process.env.KV_REST_API_URL,
      UPSTASH: !!process.env.UPSTASH_REDIS_REST_URL,
      REDIS: !!process.env.REDIS_URL
    }
  };

  if (!url) {
    return res.status(500).json({ 
      error: 'Redis URL missing', 
      details: 'Please ensure REDIS_URL or KV_REST_API_URL is set in Vercel.',
      envCheck 
    });
  }

  try {
    const kv = createClient({ url, token });

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
      
      await kv.lpush('visits', JSON.stringify(visit));
      await kv.ltrim('visits', 0, 999);
      return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
      const visits = await kv.lrange('visits', 0, -1);
      const parsedVisits = Array.isArray(visits) 
        ? visits.map(v => typeof v === 'string' ? JSON.parse(v) : v)
        : [];
      return res.status(200).json(parsedVisits);
    }

    if (req.method === 'DELETE') {
      await kv.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Redis Operation Error', 
      message: error.message,
      envCheck 
    });
  }
}
