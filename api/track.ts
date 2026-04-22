import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for environment variables
  const envCheck = {
    url: !!process.env.KV_REST_API_URL,
    token: !!process.env.KV_REST_API_TOKEN,
  };

  try {
    if (req.method === 'POST') {
      const { referrer, utmSource, timestamp, path, userAgent } = req.body;
      
      if (!envCheck.url || !envCheck.token) {
        return res.status(500).json({ 
          error: 'KV environment variables are missing', 
          envCheck 
        });
      }

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
        return res.status(200).json({ success: true });
      } catch (kvError: any) {
        return res.status(500).json({ 
          error: 'KV Storage Error', 
          message: kvError.message,
          envCheck 
        });
      }
    }

    if (req.method === 'GET') {
      if (!envCheck.url || !envCheck.token) {
        return res.status(500).json({ 
          error: 'KV environment variables are missing', 
          envCheck 
        });
      }

      try {
        const visits = await kv.lrange('visits', 0, -1);
        const parsedVisits = visits.map(v => typeof v === 'string' ? JSON.parse(v) : v);
        return res.status(200).json(parsedVisits);
      } catch (kvError: any) {
        return res.status(500).json({ 
          error: 'KV Fetch Error', 
          message: kvError.message,
          envCheck 
        });
      }
    }

    if (req.method === 'DELETE') {
      await kv.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (globalError: any) {
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: globalError.message 
    });
  }
}
