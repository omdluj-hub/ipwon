import { createClient } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Create a custom KV client that checks for both possible env var names
const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for environment variables
  const envCheck = {
    KV_URL: !!process.env.KV_REST_API_URL,
    KV_TOKEN: !!process.env.KV_REST_API_TOKEN,
    UPSTASH_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
  };

  try {
    const hasConfig = (envCheck.KV_URL && envCheck.KV_TOKEN) || (envCheck.UPSTASH_URL && envCheck.UPSTASH_TOKEN);

    if (!hasConfig) {
      return res.status(500).json({ 
        error: 'Redis configuration missing. Please connect KV or Redis in Vercel dashboard.', 
        envCheck 
      });
    }

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
      const parsedVisits = visits.map(v => typeof v === 'string' ? JSON.parse(v) : v);
      return res.status(200).json(parsedVisits);
    }

    if (req.method === 'DELETE') {
      await kv.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Redis/KV Operation Failed', 
      message: error.message,
      envCheck 
    });
  }
}
