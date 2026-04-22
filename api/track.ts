import Redis from 'ioredis';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for Redis URL
  const redisUrl = process.env.REDIS_URL || process.env.KV_URL || process.env.UPSTASH_REDIS_REST_URL;

  if (!redisUrl) {
    return res.status(500).json({ 
      error: 'Redis connection URL missing', 
      details: 'Please ensure REDIS_URL is set in Vercel Environment Variables.'
    });
  }

  // Create a Redis client (handle both standard redis:// and secure rediss://)
  const redis = new Redis(redisUrl);

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
      
      // LPUSH to 'visits' list
      await redis.lpush('visits', JSON.stringify(visit));
      // Keep only last 1000 items
      await redis.ltrim('visits', 0, 999);
      
      return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
      // LRANGE 0 -1 to get all items
      const visits = await redis.lrange('visits', 0, -1);
      const parsedVisits = visits.map(v => JSON.parse(v));
      return res.status(200).json(parsedVisits);
    }

    if (req.method === 'DELETE') {
      await redis.del('visits');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Redis Operation Error:', error);
    return res.status(500).json({ 
      error: 'Redis Operation Error', 
      message: error.message 
    });
  } finally {
    // Ensure the connection is closed after each request to avoid hitting connection limits
    await redis.quit();
  }
}
